import React from "react";
import StockTickerItem from "../StockTickerItem/StockTickerItem";

export default function WatchList(props) {
  function listItems() {
    if (props.watchList !== 0) {
      const watchList = props.watchList.map((tickers) => {
        return (
          <StockTickerItem
            ticker={tickers.ticker}
            key={tickers._id}
            id={tickers._id}
            deleteWItem={props.deleteWItem}
          />
        );
      });
      return watchList;
    } else {
      return <div> There are no items in your watchlist!</div>;
    }
  }

  return (
    <div>
      {listItems()}
      <li>hi</li>
    </div>
  );
}
