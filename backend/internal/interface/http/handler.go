package http

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/utakatalp/FullStackCase/internal/usecase"
)

type Handler struct {
	getItemsWithPriceUseCase  *usecase.GetItemsWithPriceUseCase
	filterByPriceRangeUseCase *usecase.FilterByPriceRangeUseCase
	filterByPopularityUseCase *usecase.FilterByPopularityUseCase
}

func NewHandler(
	getItemsWithPriceUseCase *usecase.GetItemsWithPriceUseCase,
	filterByPriceRangeUseCase *usecase.FilterByPriceRangeUseCase,
	filterByPopularityUseCase *usecase.FilterByPopularityUseCase,

) *Handler {
	return &Handler{
		getItemsWithPriceUseCase:  getItemsWithPriceUseCase,
		filterByPriceRangeUseCase: filterByPriceRangeUseCase,
		filterByPopularityUseCase: filterByPopularityUseCase,
	}

}

func (handler *Handler) GetItemsWithPrice(context *gin.Context) {
	items, err := handler.getItemsWithPriceUseCase.Execute()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, items)
}
func (handler *Handler) FilterByPopularityUseCase(context *gin.Context) {
	items := handler.filterByPopularityUseCase.Execute()
	if items == nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve items"})
		return
	}
	context.JSON(http.StatusOK, items)
}
func (handler *Handler) FilterByPriceRangeUseCase(context *gin.Context) {

	maxPrice, err := parseQueryFloat(context, "max_price")
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid max_price parameter"})
		return
	}
	minPrice, err := parseQueryFloat(context, "min_price")
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid min_price parameter"})
		return
	}

	items, err := handler.filterByPriceRangeUseCase.Execute(minPrice, maxPrice)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, items)
}

func parseQueryFloat(context *gin.Context, key string) (float64, error) {
	str, ok := context.GetQuery(key)
	if !ok {
		return 0, nil // or return an error if the parameter is required
	}
	return strconv.ParseFloat(str, 64)
}
