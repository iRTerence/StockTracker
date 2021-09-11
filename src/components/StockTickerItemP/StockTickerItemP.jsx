import React, { useState, useEffect } from "react";
import useToggleState from "../../hooks/toggleState";
import EditForm from "../EditForm/EditForm";
import styles from "./StockTickerItemP.module.css";

export default function StockTickerItem(props) {
  const [isEditing, toggle] = useToggleState();
  const [rerender, setRerender] = useState(false);

  function handleRemove() {
    props.delete(props.id, props.ticker);
  }

  function marketCost() {
    setRerender(!rerender);
  }
  //setting all the prop information for readability
  let companyName = props.apiInfo.name;
  let stockPrice = props.apiInfo.price.toFixed(2);
  let changePrecentage = props.apiInfo.changesPercentage.toFixed(2);
  let dollarChange = props.apiInfo.change.toFixed(2);
  let bookCost = props.holdings * props.average;
  let marketValue = (props.holdings * props.apiInfo.price).toFixed(2);
  let dailyGain = (props.holdings * props.apiInfo.change).toFixed(2);
  let totalGainPercent = (
    ((stockPrice - props.average) / props.average) *
    100
  ).toFixed(2);

  let totalGain = (bookCost * (totalGainPercent / 100)).toFixed(2);

  return (
    <tr>
      {!props.loaded ? (
        <td>Loading!</td>
      ) : (
        <>
          {isEditing ? (
            <td colSpan='10'>
              <EditForm
                id={props.id}
                key={props.id}
                edit={props.edit}
                toggle={toggle}
                shares={props.holdings}
                average={props.average}
                marketCost={marketCost}
              />
            </td>
          ) : (
            <>
              <td>
                <div>{props.ticker}</div>
                <div>{companyName}</div>
                <div>{stockPrice}</div>
              </td>
              <td>
                <div
                  className={
                    dollarChange > 0 ? styles.positive : styles.negative
                  }>
                  {changePrecentage}%
                </div>

                <div
                  className={
                    dollarChange > 0 ? styles.positive : styles.negative
                  }>
                  {dollarChange}
                </div>
              </td>
              <td>{props.holdings}</td>
              <td>${props.average}</td>
              <td>${marketValue}</td>
              <td>${bookCost}</td>

              <td>{dailyGain}</td>
              <td
                className={
                  totalGainPercent >= 0 ? styles.positive : styles.negative
                }>
                <div>
                  {totalGainPercent !== "Infinity" ? `${totalGainPercent}%` : 0}
                </div>
                <div>{isNaN(totalGain) ? 0 : totalGain}</div>
              </td>
              <td>{props.apiInfo.avgVolume}</td>
              <td>
                <button onClick={handleRemove}>X</button>
                <button onClick={toggle}>Edit</button>
              </td>
            </>
          )}
        </>
      )}
    </tr>
  );
}
