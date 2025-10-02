package main

import (
	"log"

	"github.com/utakatalp/FullStackCase/internal/infrastructure/external"
	"github.com/utakatalp/FullStackCase/internal/infrastructure/persistence"
	httpDelivery "github.com/utakatalp/FullStackCase/internal/interface/http"
	"github.com/utakatalp/FullStackCase/internal/usecase"
)

func main() {
	itemRepo := persistence.NewJSONItemRepository("products.json")
	goldPriceProvider := external.NewGoldAPIProvider("https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD")
	// mock := external.NewMockGoldAPIProvider()

	getItemsUseCase := &usecase.GetItemsUseCase{Repo: itemRepo}
	calculatePriceUseCase := &usecase.CalculatePriceUseCase{
		Repo: itemRepo,
		Gold: goldPriceProvider,
	}
	getItemsWithPriceUseCase := &usecase.GetItemsWithPriceUseCase{
		GetItemsUseCase:       getItemsUseCase,
		CalculatePriceUseCase: calculatePriceUseCase,
	}
	filterByPopularityUseCase := &usecase.FilterByPopularityUseCase{
		GetItemsWithPriceUseCase: getItemsWithPriceUseCase,
	}
	filterByPriceRangeUseCase := &usecase.FilterByPriceRangeUseCase{
		GetItemsWithPriceUseCase: getItemsWithPriceUseCase,
	}

	handler := httpDelivery.NewHandler(getItemsWithPriceUseCase, filterByPriceRangeUseCase, filterByPopularityUseCase)
	router := httpDelivery.NewRouter(handler)

	log.Println("Server running on :8080")
	router.Run(":8080")

}
