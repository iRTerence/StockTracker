import React from "react";

export default function StockTickerItem(props) {
  function handleRemove() {
    props.delete(props.id);
  }
  return (
    <div>
      <li>
        {props.ticker}
        <button onClick={handleRemove}>X</button>
      </li>
    </div>
  );
}
