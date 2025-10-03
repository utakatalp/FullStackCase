import React from "react";
import { ACTIONS } from "../../app/store";
import ColorPicker, { getColorInfo } from "../../components/ColorPicker";
import Rating from "@mui/material/Rating";
import { Card } from "antd";

function CatalogCard({ item, selectedColor, dispatch }) {
  
  const color = selectedColor || Object.keys(item.images || {})[0] || "rose";
  const imageUrl = item.images[color];

  const popularity = Number((item.popularityScore * 5).toFixed(1));
  const popularityText = `${popularity.toFixed(1)}/5`;
  const { label } = getColorInfo(color);

  return (
    
    
      <Card
        style={{ width: 280, borderRadius: 20}}
        styles={{ body: { padding: 0 } }}
      >
        <img
          src={imageUrl}
          alt={`${item.name} - ${color}`}
          style={{ width: "100%", objectFit: "contain", display: "block", marginBottom: 16, borderRadius: 20 }}
        />
        <div style={{ padding: "0 16px 16px" }}>
          <p style={{ margin: "0 0 4px", fontFamily: "Montserrat-Medium", fontSize: 15}}>{item.name}</p>
          <p style={{ margin: 0, marginBottom: 20, fontFamily: "Montserrat-Regular", fontSize: 15 }}>${item.price.toFixed(2)} USD</p>

          <ColorPicker
            images={item.images}
            selectedColor={color}
            onSelectColor={(newColor) =>
              dispatch({
                type: ACTIONS.SELECT_ITEM_COLOR,
                payload: { itemName: item.name, color: newColor },
              })
            }
          />
          <p style={{ margin: "8px 0 0", fontFamily: "Avenir-Book", fontSize: 12 }}>{label}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 4,
            }}
          >
            <Rating
              name="popularity"
              value={popularity}
              precision={0.1}
              readOnly
              size="small"
              sx={{ fontSize: 18 }}
            />
            <p style={{ margin: 0, fontFamily: "Avenir-Book", fontSize: 14}}>{popularityText}</p>
          </div>
          
        </div>
      </Card>
    
  );
}

export default CatalogCard;
