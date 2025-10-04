package persistence

import (
	"encoding/json"
	"os"

	"github.com/utakatalp/FullStackCase/internal/domain/entity"
)

type JSONItemRepository struct {
	filePath string
}

func NewJSONItemRepository(filePath string) *JSONItemRepository {
	return &JSONItemRepository{filePath: filePath}
}

func (repo *JSONItemRepository) GetAllItems() ([]entity.Item, error) {
	data, err := os.ReadFile(repo.filePath)
	if err != nil {
		return nil, err
	}
	var items []entity.Item
	if err := json.Unmarshal(data, &items); err != nil {
		return nil, err
	}
	return items, nil
}
