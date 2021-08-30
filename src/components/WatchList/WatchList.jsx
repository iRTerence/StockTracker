import React, { useContext } from "react";
import StockTickerItem from "../StockTickerItem/StockTickerItem";
import { myContext } from "../../contexts/UserContext";

export default function WatchList(props) {
  const context = useContext(myContext);

  function listItems() {
    if (props.watchList !== 0) {
      const watchList = props.watchList.map((tickers) => {
        return <StockTickerItem ticker={tickers} />;
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
