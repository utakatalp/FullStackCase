package usecase

import "github.com/utakatalp/FullStackCase/internal/domain/entity"

type GetItemsWithPriceUseCase struct {
	GetItemsUseCase       *GetItemsUseCase
	CalculatePriceUseCase *CalculatePriceUseCase
}

func (usecase *GetItemsWithPriceUseCase) Execute() ([]entity.ItemWithPrice, error) {
	items, err := usecase.GetItemsUseCase.Execute()
	if err != nil {
		return nil, err
	}

	itemsWithPrice := make([]entity.ItemWithPrice, 0, len(items))
	for i := range items {
		price, err := usecase.CalculatePriceUseCase.Execute(items[i].Name)
		if err != nil {
			return nil, err
		}
		itemsWithPrice = append(itemsWithPrice, entity.ItemWithPrice{
			Item:  items[i],
			Price: price,
		})
	}

	return itemsWithPrice, nil
}
