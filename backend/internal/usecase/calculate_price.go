package usecase

import (
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

func (usecase *CalculatePriceUseCase) Execute(item entity.Item) (float64, error) {
	bid, ask, err := usecase.Gold.GetCurrentGoldPrice()
	if err != nil {
		if !cacheValid {
			return 0, err
		}
		bid = cachedBid
		ask = cachedAsk
	} else {
		cachedBid = bid
		cachedAsk = ask
		cacheValid = true
	}

	return service.CalculatePrice(item, service.MidPrice(bid, ask)), nil
}
