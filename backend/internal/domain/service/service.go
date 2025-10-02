package service

import "github.com/utakatalp/FullStackCase/internal/domain/entity"

const OnsToGram = 31.10 // 1 Ons = 31.10 Gram

func CalculatePrice(item entity.Item, goldPrice float64) float64 {
	return (item.PopularityScore + 1) * item.Weight * goldPrice / OnsToGram
}

func MidPrice(bid, ask float64) float64 {
	return (bid + ask) / 2
}
