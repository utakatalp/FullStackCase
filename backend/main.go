package main

import (
	"log"

	"github.com/utakatalp/FullStackCase/internal/infrastructure/config"
	"github.com/utakatalp/FullStackCase/internal/infrastructure/external"
	"github.com/utakatalp/FullStackCase/internal/infrastructure/persistence"
	httpDelivery "github.com/utakatalp/FullStackCase/internal/interface/http"
	"github.com/utakatalp/FullStackCase/internal/usecase"
)

func main() {
	cfg := config.Load()

	itemRepo := persistence.NewJSONItemRepository(cfg.JSONFilePath)
	goldPriceProvider := external.NewGoldAPIProvider(cfg.GoldAPIURL)

	getItemsUseCase := &usecase.GetItemsUseCase{Repo: itemRepo}
	calculatePriceUseCase := &usecase.CalculatePriceUseCase{
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

	log.Println("Server running on ", cfg.ServerPort)
	router.Run(cfg.ServerPort)

}
