import React, { useState } from "react";
import StockTickerItem from "../StockTickerItemP/StockTickerItemP";

export default function PortList(props) {
  function listItems() {
    if (props.portList !== 0) {
      const portList = props.portList.map((tickers) => {
        return (
          <StockTickerItem
            ticker={tickers.ticker}
            key={tickers._id}
            id={tickers._id}
            delete={props.deletePitem}
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
      {listItems()}
    </div>
  );
}
