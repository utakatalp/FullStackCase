package usecase

import "github.com/utakatalp/FullStackCase/internal/domain/entity"

type FilterByPriceRangeUseCase struct {
	GetItemsWithPriceUseCase *GetItemsWithPriceUseCase
}

func (usecase *FilterByPriceRangeUseCase) Execute(minPrice float64, maxPrice float64) ([]entity.ItemWithPrice, error) {
	items, err := usecase.GetItemsWithPriceUseCase.Execute()
	if err != nil {
		return nil, err
	}
	var filteredItems []entity.ItemWithPrice
	for i := range items {
		if items[i].Price >= minPrice && items[i].Price >= maxPrice {
			filteredItems = append(filteredItems, items[i])
		}
	}
	return filteredItems, nil
}
