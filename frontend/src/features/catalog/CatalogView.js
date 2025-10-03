import React, { useReducer, useEffect } from "react";
import { reducer, initialState, ACTIONS } from "../../app/store";
import { itemsRepository } from "../../data/repository/itemsRepository.js";
import { Carousel } from 'antd';
import CatalogCard from "./CatalogCard";
import { Skeleton } from 'antd';
import { Card } from "antd";

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


function CatalogView({state, dispatch}) {
  
  console.log("Current state:", state);

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

      {state.loading && <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
        {[0, 1, 2, 3].map((key) => (
          <Card key={key} style={{ width: 280 }}>
            <Skeleton.Image active style={{ width: 240, height: 260, objectFit: "contain" }} />
            <Skeleton active paragraph={{ rows: 2 }} title={false} />
          </Card>
          
        ))}
      </div>}
      {state.error && (
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
      )}


      {state.items?.length > 0 && (
        <Carousel arrows = {true} infinite={false} style={{ maxWidth: '1200px', margin: '0 auto' ,color:'black'}}>
          {Array.from({ length: Math.ceil(state.items.length/4) }).map((_, idx) => (
            <div key={idx}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "24px",
                  padding: "0 16px",
                }}
              >
                {state.items.slice(idx*4 , idx * 4 + 4 ).map((item) => (
                  <CatalogCard
                    key={item.name}
                    item={item}
                    selectedColor={state.selectedColors[item.name]}
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
