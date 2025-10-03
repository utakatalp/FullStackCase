import React from "react";
import CatalogView from "./features/catalog/CatalogView";
import FilterPanel from "./features/catalog/FilterPanel";
import useCatalogData from "./features/catalog/useCatalogData";

function App() {
  const { state, dispatch, filterByPopularity, filterByPriceRange } = useCatalogData();

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontFamily: "Avenir-Book", fontSize: 45, paddingTop: 60 }}>
        Product List
      </h1>

      <CatalogView
        items={state.items}
        loading={state.loading}
        error={state.error}
        selectedColors={state.selectedColors}
        dispatch={dispatch}
      />
      <FilterPanel
        onFilterByPopularity={filterByPopularity}
        onFilterByPriceRange={filterByPriceRange}
      />
    </div>
  );
}

export default App;
