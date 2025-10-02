package usecase

import (
	"github.com/utakatalp/FullStackCase/internal/domain"
	"github.com/utakatalp/FullStackCase/internal/domain/entity"
)

type GetItemsUseCase struct {
	Repo domain.ItemRepository
}

func (usecase *GetItemsUseCase) Execute() ([]entity.Item, error) {
	return usecase.Repo.GetAllItems()
}
