package tests

import (
	"errors"
	"testing"

	"github.com/utakatalp/FullStackCase/internal/domain/entity"
	"github.com/utakatalp/FullStackCase/internal/domain/service"
	"github.com/utakatalp/FullStackCase/internal/usecase"
)

type fakeGoldPriceProvider struct {
	bid float64
	ask float64
	err error
}

var item = &entity.Item{
	Name:            "test",
	PopularityScore: 2,
	Weight:          10,
}

func (provider fakeGoldPriceProvider) GetCurrentGoldPrice() (float64, float64, error) {
	return provider.bid, provider.ask, provider.err
}

func (provider fakeGoldPriceProvider) GetGoldPrice() (float64, float64, error) {
	return provider.bid, provider.ask, provider.err
}

func TestCalculatePriceUseCaseSuccess(t *testing.T) {

	gold := fakeGoldPriceProvider{bid: 14, ask: 16}
	usecase := usecase.CalculatePriceUseCase{Gold: gold}

	price, err := usecase.Execute(*item)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	expected := service.CalculatePrice(*item, service.MidPrice(gold.bid, gold.ask))
	if price != expected {
		t.Fatalf("expected price %f, got %f", expected, price)
	}
}

func TestCalculatePriceUseCaseGoldError(t *testing.T) {
	item := &entity.Item{Name: "test"}
	gold := fakeGoldPriceProvider{err: errors.New("gold error")}
	usecase := usecase.CalculatePriceUseCase{Gold: gold}

	price, err := usecase.Execute(*item)
	if err == nil {
		t.Fatal("expected error, got nil")
	}
	if price != 0 {
		t.Fatalf("expected price 0, got %f", price)
	}
}
