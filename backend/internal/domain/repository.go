package domain

import "github.com/utakatalp/FullStackCase/internal/domain/entity"

type ItemRepository interface {
	GetAllItems() ([]entity.Item, error)
}

type GoldPriceProvider interface {
	GetCurrentGoldPrice() (float64, float64, error)
}
