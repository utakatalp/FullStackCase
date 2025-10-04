package http

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func NewRouter(handler *Handler) *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.Use(cors.Default())
	router.GET("/items", handler.GetItemsWithPrice)
	router.GET("/items/popularity", handler.FilterByPopularityUseCase)
	router.GET("/items/price-range", handler.FilterByPriceRangeUseCase)
	return router
}
