package entity

type Item struct {
	Name            string            `json:"name"`
	PopularityScore float64           `json:"popularityScore"`
	Weight          float64           `json:"weight"`
	Images          map[string]string `json:"images"`
}
