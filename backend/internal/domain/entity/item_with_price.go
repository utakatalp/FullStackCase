package entity

type ItemWithPrice struct {
	Item  Item    `json:"item"`
	Price float64 `json:"price"`
}
