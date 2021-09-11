import React from "react";

export default function StockTickerItem(props) {
  function handleRemove() {
    props.deleteWItem(props.id);
  }

  let {
    price,
    symbol,
    name,
    change,
    changesPercentage,
    dayLow,
    dayHigh,
    yearLow,
    yearHigh,
    volume,
    avgVolume,
  } = props.apiInfo;

  return (
    <tr>
      <td>
        <div>{symbol}</div>
        <div>{name}</div>
      </td>
      <td>{price.toFixed(2)}</td>
      <td>{change.toFixed(2)}</td>
      <td>{changesPercentage.toFixed(2)}</td>
      <td>
        <div> Day Low: {dayLow}</div> <>Day High</> {dayHigh}
      </td>
      <td>
        <div>Year Low: {yearLow}</div>
        <>Year High: {yearHigh}</>
      </td>
      <td>{volume}</td>
      <td>{avgVolume}</td>
      <td>
        <button onClick={handleRemove}>X</button>
      </td>
    </tr>
  );
}
