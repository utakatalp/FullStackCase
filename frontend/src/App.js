import React, { useEffect, useState } from "react";
import CatalogView from "./features/catalog/CatalogView";
import FilterPanel from "./features/catalog/FilterPanel";
import useCatalogData from "./features/catalog/useCatalogData";
import CatalogViewForMobile from "./features/catalog/CatalogViewForMobile";

function App() {
  const { state, dispatch, filterByPopularity, filterByPriceRange } = useCatalogData();

  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      {isMobile ? (
        <CatalogViewForMobile
          items={state.items}
          loading={state.loading}
          error={state.error}
          selectedColors={state.selectedColors}
          dispatch={dispatch}
        />
      ) : (
        <CatalogView
          items={state.items}
          loading={state.loading}
          error={state.error}
          selectedColors={state.selectedColors}
          dispatch={dispatch}
        />
      )}
      <FilterPanel
        onFilterByPopularity={filterByPopularity}
        onFilterByPriceRange={filterByPriceRange}
      />
    </div>
  );
}

export default App;
