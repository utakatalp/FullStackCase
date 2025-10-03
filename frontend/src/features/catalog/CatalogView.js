import React from "react";
import { Card, Carousel, Skeleton } from "antd";
import CatalogCard from "./CatalogCard";

const SKELETON_CARD_COUNT = 4;



function CatalogView({ loading, error, items, selectedColors, dispatch }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 30,
      }}
    >
      {loading && renderLoadingSkeleton()}
      {error && renderErrorState()}

      {items?.length > 0 && (
        <Carousel
          arrows={true}
          infinite={false}
          style={{ maxWidth: "1200px", margin: "0 auto", color: "black" }}
        >
          {Array.from({ length: Math.ceil(items.length / 4) }).map((_, idx) => (
            <div key={idx}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "24px",
                  padding: "0 16px",
                }}
              >
                {items.slice(idx * 4, idx * 4 + 4).map((item) => (
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

export default CatalogView;

function renderLoadingSkeleton() {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
      {Array.from({ length: SKELETON_CARD_COUNT }).map((_, key) => (
        <Card key={key} style={{ width: 280 }}>
          <Skeleton.Image
            active
            style={{ width: 240, height: 260, objectFit: "contain" }}
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
        width: 240,
        height: 385,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <span className="text-red-500">Products haven't found.</span>
    </div>
  );
}
