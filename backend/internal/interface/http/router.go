package http

import "github.com/gin-gonic/gin"

func NewRouter(handler *Handler) *gin.Engine {
	router := gin.Default()
	router.GET("/items", handler.GetItemsWithPrice)
	router.GET("/items/popularity", handler.FilterByPopularityUseCase)
	router.GET("/items/price-range", handler.FilterByPriceRangeUseCase)
	return router
}
