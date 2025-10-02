package config

type Config struct {
	JSONFilePath string
	GoldAPIURL   string
	ServerPort   string
}

func Load() *Config {
	cfg := &Config{
		JSONFilePath: "products.json",
		GoldAPIURL:   "https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD",
		ServerPort:   ":8080",
	}
	return cfg
}
