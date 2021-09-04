import React from "react";
import StockTickerItemP from "../StockTickerItemP/StockTickerItemP";

export default function portList(props) {
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
            stocks={tickers.holdings}
            average={tickers.average}
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
