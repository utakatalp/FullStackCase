package usecase

import (
	"sort"

	"github.com/utakatalp/FullStackCase/internal/domain/entity"
)

type FilterByPopularityUseCase struct {
	GetItemsWithPriceUseCase *GetItemsWithPriceUseCase
}

func (usecase *FilterByPopularityUseCase) Execute() []entity.ItemWithPrice {
	items, err := usecase.GetItemsWithPriceUseCase.Execute()
	if err != nil {
		return nil
	}
	sort.Slice(items, func(i, j int) bool {
		return items[i].Item.PopularityScore > items[j].Item.PopularityScore
	})

	return items
}
