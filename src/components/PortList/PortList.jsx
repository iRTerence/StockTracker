import React, { useState, useEffect } from "react";
import StockTickerItemP from "../StockTickerItemP/StockTickerItemP";
import { myContext } from "../../contexts/UserContext";
import axios from "axios";
const token = process.env.REACT_APP_FMP_ID;

export default function PortList(props) {
  let [api, setApi] = useState([]);

  //add initial investment for portfolio
  function addValues() {
    if (props.portList !== 0) {
      const newArray = props.portList.map(
        (element) => element.holdings * element.average
      );
      return newArray.reduce((a, b) => a + b, 0);
    }
  }

  function listItems() {
    if (props.portList !== 0) {
      const portList = props.portList.map((tickers) => {
        return (
          <StockTickerItemP
            ticker={tickers.ticker}
            key={tickers._id}
            id={tickers._id}
            delete={props.deletePitem}
            edit={props.edit}
            holdings={tickers.holdings}
            average={tickers.average}
            addApiPort={props.addApiPort}
          />
        );
      });
      return portList;
    } else {
      return <div> There are no items in your Portfolio!</div>;
    }
  }
  return (
    <div>
      <div>Port List</div>
      Initial Investment: {addValues()}
      {listItems()}
    </div>
  );
}
