import React, { useState, useEffect } from "react";
import useToggleState from "../../hooks/toggleState";
import EditForm from "../EditForm/EditForm";
const fmp = require("financialmodelingprep")(process.env.REACT_APP_FMP_ID);

export default function StockTickerItem(props) {
  const [isEditing, toggle] = useToggleState();
  const [isLoading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
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
    setTotalValue(props.holdings * apiData[0].price);
    setRerender(!rerender);
  }

  let value = props.holdings * props.average;

  return (
    <div>
      {isLoading ? (
        <h1>Loading!</h1>
      ) : (
        <li>
          {isEditing ? (
            <EditForm
              id={props.id}
              key={props.id}
              edit={props.edit}
              toggle={toggle}
              shares={props.holdings}
              average={props.average}
              marketCost={marketCost}
            />
          ) : (
            <>
              {props.ticker} - Value : {value} | Market Value:
              {/* {props.holdings * apiData[0].price} */}
              <button onClick={handleRemove}>X</button>
              <button onClick={toggle}>Edit</button>
            </>
          )}
        </li>
      )}
    </div>
  );
}
