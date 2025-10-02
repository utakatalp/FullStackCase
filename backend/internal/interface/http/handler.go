package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/utakatalp/FullStackCase/internal/usecase"
)

type Handler struct {
	getItemsWithPriceUseCase *usecase.GetItemsWithPriceUseCase
}

func NewHandler(getItemsWithPriceUseCase *usecase.GetItemsWithPriceUseCase) *Handler {
	return &Handler{
		getItemsWithPriceUseCase: getItemsWithPriceUseCase,
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
