import React from "react";

export default function StockTickerItem(props) {
  return (
    <div>
      <li>
        {props.ticker} <button>X</button>
      </li>
    </div>
  );
}
