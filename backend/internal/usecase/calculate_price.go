package usecase

import (
	"github.com/utakatalp/FullStackCase/internal/domain"
	"github.com/utakatalp/FullStackCase/internal/domain/entity"
	"github.com/utakatalp/FullStackCase/internal/domain/service"
)

type CalculatePriceUseCase struct {
	Gold domain.GoldPriceProvider
}

type GoldPrice struct {
	Bid float64
	Ask float64
}

func (usecase *CalculatePriceUseCase) Execute(item entity.Item) (float64, error) {

	bid, ask, err := usecase.Gold.GetGoldPrice()
	if err != nil {
		return 0, err
	}
	return service.CalculatePrice(item, service.MidPrice(bid, ask)), nil
}
