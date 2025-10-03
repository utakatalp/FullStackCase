import React from "react";
import { useReducer, useEffect } from "react";
import { reducer, initialState, ACTIONS } from "./app/store";
import CatalogView from "./features/catalog/CatalogView";
import { useState } from "react";
import { itemsRepository } from "./data/repository/itemsRepository.js";
import { Slider } from 'antd';
import { Button, ConfigProvider, Space } from 'antd';

function App() {
      const [minPriceText, setMinPriceText] = useState("0");
      const [maxPriceText, setMaxPriceText] = useState("1500");
      const [state, dispatch] = useReducer(reducer, initialState);
      const onChange = value => {
        console.log('onChange: ', value);
        setMinPriceText(value[0]);
        setMaxPriceText(value[1]);
      };
      const onChangeComplete = value => {
        console.log('onChangeComplete: ', value);
      };

      const handleFilterByPopularity = async () => {
        dispatch({ type: ACTIONS.FETCH_ITEMS_START });
          try {
            const items = await itemsRepository.getByPopularity();
            dispatch({ type: ACTIONS.FETCH_ITEMS_SUCCESS, payload: items });
          } catch (err) {
            dispatch({ type: ACTIONS.FETCH_ITEMS_ERROR, payload: err.message });
          }
      };

      const handleFilterByPriceRange = async () => {
        dispatch({ type: ACTIONS.FETCH_ITEMS_START });
          try {
            const items = await itemsRepository.getByPriceRange(parseFloat(minPriceText), parseFloat(maxPriceText));
            dispatch({ type: ACTIONS.FETCH_ITEMS_SUCCESS, payload: items });
          } catch (err) {
            dispatch({ type: ACTIONS.FETCH_ITEMS_ERROR, payload: err.message });
          }
      };

      useEffect(() => {
        async function fetchItems() {
          dispatch({ type: ACTIONS.FETCH_ITEMS_START });
          try {
            const items = await itemsRepository.getAll();
            console.log("Fetched items:", items);
            dispatch({ type: ACTIONS.FETCH_ITEMS_SUCCESS, payload: items });
          } catch (err) {
            dispatch({ type: ACTIONS.FETCH_ITEMS_ERROR, payload: err.message });
          }
        }
        fetchItems();
      }, []);
  return (
    
    <div className="App" 
    style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        }}>
        <h1 style={{fontFamily: "Avenir-Book", fontSize: 45, paddingTop: 60}}>Product List</h1>

        <Button onClick={handleFilterByPopularity} type="primary">Sort By Popularity</Button>
      
      <CatalogView state={state} dispatch={dispatch} />
        <div style = {{display: "flex", alignItems: "center", gap: "10px"}}>
          <p>Minimum: {minPriceText}</p>
          <Slider
            range
            min={0}
            max={1500}
            step={1}
            defaultValue={[0, 1500]}
            onChange={onChange}
            onChangeComplete={onChangeComplete}
            style={{ width: 400, margin: "50px 20px" }}
            styles={{
              rail: { height: 12 },
              track: { height: 12 },
              handle: { width: 24, height: 24, marginTop: 4, marginLeft: 6 },
            }}
          />
          <p>Maximum: {maxPriceText}</p>
        </div>
        <Button onClick={handleFilterByPriceRange} type="primary">Filter By Price Range</Button>


        

    </div>
  );
}

export default App;