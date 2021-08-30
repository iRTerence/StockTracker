import React, { useState } from "react";
import StockTickerItem from "../StockTickerItem/StockTickerItem";

export default function PortList(props) {
  function listItems() {
    if (props.portList !== 0) {
      const portList = props.portList.map((tickers) => {
        return <StockTickerItem ticker={tickers.ticker} key={tickers._id} />;
      });
      return portList;
    } else {
      return <div> There are no items in your PortList!</div>;
    }
  }
  return (
    <div>
      <div>Port List</div>
      {listItems()}
    </div>
  );
}
