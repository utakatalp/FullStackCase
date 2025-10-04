package usecase

import (
	"errors"
	"time"

	"github.com/utakatalp/FullStackCase/internal/domain"
	"github.com/utakatalp/FullStackCase/internal/domain/entity"
	"github.com/utakatalp/FullStackCase/internal/domain/service"
)

type CalculatePriceUseCase struct {
	Repo domain.ItemRepository
	Gold domain.GoldPriceProvider
}

type GoldPrice struct {
	Bid float64
	Ask float64
}

var (
	cachedBid  float64
	cachedAsk  float64
	cacheValid bool
) // A timestamp could avoid continuous API calls, but I left it out so the prices stay obviously dynamic.

type result struct {
	bid float64
	ask float64
	err error
}

func (usecase *CalculatePriceUseCase) Execute(item entity.Item) (float64, error) {

	ch := make(chan result, 1)

	go func() {
		bid, ask, err := usecase.Gold.GetCurrentGoldPrice()
		ch <- result{bid: bid, ask: ask, err: err}
	}()

	select {
	case res := <-ch:
		if res.err != nil {
			if !cacheValid {
				return 0, res.err
			}
			return service.CalculatePrice(item, service.MidPrice(cachedBid, cachedAsk)), nil
		}
		cachedBid = res.bid
		cachedAsk = res.ask
		cacheValid = true
		return service.CalculatePrice(item, service.MidPrice(res.bid, res.ask)), nil

	case <-time.After(5 * time.Second):
		if !cacheValid {
			return 0, errors.New("gold price request timed out and no cache available")
		}
		return service.CalculatePrice(item, service.MidPrice(cachedBid, cachedAsk)), nil
	}

}
