package usecase

import (
	"github.com/utakatalp/FullStackCase/internal/domain"
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

func (usecase *CalculatePriceUseCase) Execute(itemName string) (float64, error) {
	item, err := usecase.Repo.GetItemByName(itemName)
	if err != nil {
		return 0, err
	}

	bid, ask, err := usecase.Gold.GetCurrentGoldPrice()
	if err != nil {
		return 0, err
	}

	return service.CalculatePrice(*item, service.MidPrice(bid, ask)), nil
}
