import React, { useState } from "react";
import StockTickerItem from "../StockTickerItem/StockTickerItem";

export default function StockList(props) {
  console.log(props.list);
  const watchList = props.list.map((tickers) => {
    return <StockTickerItem ticker={tickers} />;
  });

  return (
    <div>
      {watchList}
      <li>hi</li>
    </div>
  );
}
