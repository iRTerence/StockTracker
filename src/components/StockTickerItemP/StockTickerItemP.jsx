import React, { useState, useEffect } from "react";
import useToggleState from "../../hooks/toggleState";
import EditForm from "../EditForm/EditForm";
import styles from "./StockTickerItemP.module.css";
const fmp = require("financialmodelingprep")(process.env.REACT_APP_FMP_ID);

export default function StockTickerItem(props) {
  const [isEditing, toggle] = useToggleState();
  const [isLoading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [rerender, setRerender] = useState(false);

  //Load the ticker api info. Set the loading page to off once promise resolves
  useEffect(() => {
    fmp
      .stock(props.ticker)
      .quote()
      .then((response) => {
        setApiData(response);
        setLoading(false);
      });
  }, []);

  function handleRemove() {
    props.delete(props.id, props.ticker);
  }

  function marketCost() {
    setRerender(!rerender);
  }
  //setting all the prop information for readability
  let companyName = props.apiInfo.name;
  let stockPrice = props.apiInfo.price.toFixed(2);

  return (
    <tr>
      {isLoading ? (
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
                    apiData[0].change > 0 ? styles.positive : styles.negative
                  }>
                  {apiData[0].changesPercentage.toFixed(2)}%
                </div>

                <div
                  className={
                    apiData[0].change > 0 ? styles.positive : styles.negative
                  }>
                  {apiData[0].change.toFixed(2)}
                </div>
              </td>
              <td>{props.holdings}</td>
              <td>{props.average}</td>
              <td>{(props.holdings * apiData[0].price).toFixed(2)}</td>
              <td>{(props.holdings * apiData[0].change).toFixed(2)}</td>
              <td>
                {(props.holdings * apiData[0].price).toFixed(2) -
                  (props.holdings * props.average).toFixed(2)}
                <div>
                  {(
                    ((props.holdings * apiData[0].price).toFixed(2) -
                      (props.holdings * props.average).toFixed(2)) /
                    (props.holdings * props.average).toFixed(2)
                  ).toFixed(2)}
                </div>
              </td>
              <td>{apiData[0].volume}</td>
              <td>{apiData[0].avgVolume}</td>
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
