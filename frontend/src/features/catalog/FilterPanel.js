import React, { useState } from "react";
import { Button, Slider } from "antd";

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 1500;

function FilterPanel({
  onFilterByPopularity,
  onFilterByPriceRange,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
}) {
  const [range, setRange] = useState([min, max]);

  const handleSliderChange = (value) => {
    setRange(value);
  };

  const handleFilterClick = () => {
    onFilterByPriceRange(range[0], range[1]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        marginBottom: 32,
      }}
    >
      <Button onClick={onFilterByPopularity} type="primary">
        Sort By Popularity
      </Button>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span>Minimum: {range[0]}</span>
        <Slider
          range
          min={min}
          max={max}
          step={1}
          value={range}
          onChange={handleSliderChange}
          style={{ width: 400, margin: "24px 20px" }}
          styles={{
            rail: { height: 12 },
            track: { height: 12 },
            handle: { width: 24, height: 24, marginTop: 4, marginLeft: 6 },
          }}
        />
        <span>Maximum: {range[1]}</span>
      </div>

      <Button onClick={handleFilterClick} type="primary">
        Filter By Price Range
      </Button>
    </div>
  );
}

export default FilterPanel;
