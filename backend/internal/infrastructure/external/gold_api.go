package external

import (
	"encoding/json"
	"net/http"
)

type SpreadProfilePrice struct {
	Bid float64 `json:"bid"`
	Ask float64 `json:"ask"`
}

type APIResponse struct {
	SpreadProfilePrices []SpreadProfilePrice `json:"spreadProfilePrices"`
}

type GoldAPIProvider struct {
	apiURL string
}

func NewGoldAPIProvider(apiURL string) *GoldAPIProvider {
	return &GoldAPIProvider{apiURL: apiURL}
}

func (provider *GoldAPIProvider) GetCurrentGoldPrice() (float64, float64, error) {
	response, err := http.Get(provider.apiURL)
	if err != nil {
		return 0, 0, err
	}
	dec := json.NewDecoder(response.Body)
	dec.Token()
	var first APIResponse
	if err := dec.Decode(&first); err != nil {
		panic(err)
	}
	defer response.Body.Close()

	return first.SpreadProfilePrices[0].Bid, first.SpreadProfilePrices[0].Ask, nil
}

type MockGoldAPIProvider struct{}

func NewMockGoldAPIProvider() *MockGoldAPIProvider {
	return &MockGoldAPIProvider{}
}
func (m *MockGoldAPIProvider) GetCurrentGoldPrice() (float64, error) {
	return 15.0, nil
}
