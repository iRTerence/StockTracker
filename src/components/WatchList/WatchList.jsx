import React, { useContext } from "react";
import StockTickerItem from "../StockTickerItem/StockTickerItem";
import { myContext } from "../../contexts/UserContext";

export default function WatchList(props) {
  const context = useContext(myContext);

  function listItems() {
    if (context !== undefined) {
      if (context.watch.length !== 0) {
        const watchList = context.watch.map((tickers) => {
          return <StockTickerItem ticker={tickers.ticker} />;
        });
        return watchList;
      } else {
        <div> There are no items in your watchlist!</div>;
      }
    }
  }

  return (
    <div>
      {listItems()}
      <li>hi</li>
    </div>
  );
}
