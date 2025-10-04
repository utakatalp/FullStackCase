# FullStackCase

FullStackCase is a small full-stack application that showcases a jewellery catalogue. It combines a React (Create React App) frontend with a Go (Gin) backend that enriches each item with a live gold price pulled from an external API.

> Want to see it in action? Visit the live deployment: [full-stack-case-alp.vercel.app](https://full-stack-case-alp.vercel.app)

---

## Highlights

- **Dynamic pricing** — Every item price is computed from its weight and popularity combined with the latest gold mid-price sourced from the Swissquote feed. When the feed is slow or unavailable, the backend falls back to the cached price (5 s TTL) to keep the UX responsive.
- **Filters & sorting** — The frontend offers a price-range slider and a “sort by popularity” action that call dedicated backend use cases (`/items/price-range`, `/items/popularity`).
- **Clean layering** — Domain entities & services, use cases, infrastructure adapters, and HTTP delivery are separated on the backend; the frontend mirrors this with features, shared components, and data repositories.
- **Timeout-aware gold API** — External calls are wrapped with a timeout guard. If the request takes longer than 5 seconds the cached bid/ask pair is served instead.

---

## Monorepo Structure

```
FullStackCase/
├── backend/                 # Go 1.25 service
│   ├── internal/
│   │   ├── domain/          # Entities, repositories, services
│   │   ├── infrastructure/  # Config, persistence (JSON), external gold API
│   │   ├── interface/http/  # Gin handler & router
│   │   └── usecase/         # Application use cases
│   ├── products.json        # Seed data for items
│   └── main.go
└── frontend/                # React 19 application (CRA)
    ├── public/
    └── src/
        ├── app/             # Global reducer store
        ├── components/      # Shared UI pieces
        ├── features/catalog # Catalogue feature (views, hooks)
        └── data/            # Repositories for backend APIs
```

---

## Getting Started

### Prerequisites

| Tool    | Version |
|---------|---------|
| Node.js | ≥ 18    |
| npm     | ≥ 9     |
| Go      | ≥ 1.25  |

Make sure ports `3000` (frontend) and `8080` (backend) are available.



---

## Available Scripts

### Backend

- `go run main.go` – start the API server
- `go test ./tests` – run Go unit tests (pricing & filtering use cases)

### Frontend

- `npm start` – CRA development server with hot reload
- `npm test` – React Testing Library in watch mode
- `npm run build` – production build (output in `frontend/build`)

---

## API Reference

| Endpoint | Description |
|----------|-------------|
| `GET /items` | Returns all catalogue items enriched with calculated price |
| `GET /items/popularity` | Returns items sorted by popularity (descending) |
| `GET /items/price-range?min={min}&max={max}` | Returns items priced within `[min, max]` |

Example response:

```json
[
  {
    "item": {
      "name": "Engagement Ring 1",
      "popularityScore": 0.85,
      "weight": 2.1,
      "images": {
        "yellow": "...",
        "rose": "...",
        "white": "..."
      }
    },
    "price": 320.45
  }
]
```

---

## Frontend Overview

- `CatalogView` renders the carousel, loading skeletons, and error state.
- `useCatalogData` centralises fetching, filtering, and reducer-driven state management.
- `FilterPanel` hosts the price slider and filter buttons.
- `CatalogCard` handles individual product display, colour selection, and rating preview.

Fonts are loaded via `src/styles/fonts.css` for consistent typography across the app.

---

## Testing the Cache Behaviour

The gold price adapter caches bid/ask pairs for 5 seconds. Tests can reset the cache and simulate delayed responses to ensure fallback logic is triggered. See `internal/usecase/calculate_price_test.go` for examples of injecting fake providers.

---



