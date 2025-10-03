import React from "react";

export const COLOR_LOOKUP = {
  yellow: { label: "Yellow Gold", swatch: "#E6CA97" },
  white: { label: "White Gold", swatch: "#D9D9D9" },
  rose: { label: "Rose Gold", swatch: "#E1A4A9" },
};



export const getColorInfo = (key) => {
  return COLOR_LOOKUP[key] ?? { label: key, swatch: key };
};

function ColorPicker({ images, selectedColor, onSelectColor }) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
      {Object.keys(images).map((colorKey) => {
        const isSelected = selectedColor === colorKey;
        const { label, swatch } = getColorInfo(colorKey);
        return (
          <button
            key={colorKey}
            onClick={() => onSelectColor(colorKey)}
            aria-label={`Select ${label}`}
            title={`${label} (${swatch})`}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              border: `2px solid ${isSelected ? "#000000" : "#d1d5db"}`,
              padding: 2,
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: swatch,
                display: "block",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

export default ColorPicker;
