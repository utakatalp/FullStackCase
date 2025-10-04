import React, { useMemo } from "react";
import { Card, Carousel, Skeleton } from "antd";
import CatalogCard from "./CatalogCard";

const SKELETON_CARD_COUNT = 1;

function CatalogViewForMobile({ loading, error, items, selectedColors, dispatch }) {
  const slides = useMemo(() => {
    if (!items?.length) {
      return [];
    }
    return items.map((item) => [item]);
  }, [items]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "60%",
        gap: 16,
        padding: "16px 0",
      }}
    >
      {loading && renderLoadingSkeleton()}
      {error && renderErrorState()}

      {slides.length > 0 && (
        <Carousel
          dots
          arrows = {true}
          infinite = {false}
          swipeToSlide
          draggable
        >
          {slides.map((slideItems, idx) => (
            <div key={idx}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "0 12px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                {slideItems.map((item) => (
                  <CatalogCard
                    key={item.name}
                    item={item}
                    selectedColor={selectedColors[item.name]}
                    dispatch={dispatch}
                  />
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default CatalogViewForMobile;

function renderLoadingSkeleton() {
  return (
    <div style={{ padding: "0 12px" }}>
      {Array.from({ length: SKELETON_CARD_COUNT }).map((_, key) => (
        <Card key={key} style={{ width: "100%", maxWidth: 320, margin: "0 auto" }}>
          <Skeleton.Image
            active
            style={{ width: "100%", height: 260, objectFit: "contain" }}
          />
          <Skeleton active paragraph={{ rows: 2 }} title={false} />
        </Card>
      ))}
    </div>
  );
}

function renderErrorState() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: 240,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "24px 12px",
        boxSizing: "border-box",
      }}
    >
      <span className="text-red-500">Products haven't been found.</span>
    </div>
  );
}
