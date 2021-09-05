import React from "react";
import StockTickerItem from "../StockTickerItemW/StockTickerItemW";

export default function watchList(props) {
  function listItems() {
    if (props.watchList !== 0) {
      const watchList = props.watchList.map((tickers) => {
        return (
          <StockTickerItem
            ticker={tickers.ticker}
            key={tickers._id}
            id={tickers._id}
            deleteWItem={props.deleteWItem}
            apiWatchList={props.apiWatchList}
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
      <div>Watchlist</div>
      {listItems()}
    </div>
  );
}
