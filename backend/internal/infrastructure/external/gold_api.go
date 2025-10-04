package external

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"
)

type SpreadProfilePrice struct {
	Bid float64 `json:"bid"`
	Ask float64 `json:"ask"`
}

const requestTimeout = 5 * time.Second

var (
	cachedBid  float64
	cachedAsk  float64
	cacheValid bool
	lastFetch  time.Time
)

type result struct {
	bid float64
	ask float64
	err error
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

func (provider *GoldAPIProvider) GetGoldPrice() (float64, float64, error) {
	if cacheValid && time.Since(lastFetch) <= requestTimeout {
		return cachedBid, cachedAsk, nil
	}

	ch := make(chan result, 1)

	go func() {
		bid, ask, err := provider.GetCurrentGoldPrice()
		ch <- result{bid, ask, err}
	}()

	select {
	case res := <-ch:
		if res.err != nil {
			if cacheValid {
				return cachedBid, cachedAsk, nil
			}
			return 0, 0, res.err
		}
		cachedBid, cachedAsk = res.bid, res.ask
		cacheValid = true
		lastFetch = time.Now()
		return res.bid, res.ask, nil

	case <-time.After(requestTimeout):
		if cacheValid {
			return cachedBid, cachedAsk, nil
		}
		return 0, 0, errors.New("gold price request timed out and no cache available")
	}
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
