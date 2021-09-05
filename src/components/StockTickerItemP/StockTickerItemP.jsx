import React, { useState, useEffect } from "react";
import useToggleState from "../../hooks/toggleState";
import EditForm from "../EditForm/EditForm";
const fmp = require("financialmodelingprep")(process.env.REACT_APP_FMP_ID);

export default function StockTickerItem(props) {
  const [isEditing, toggle] = useToggleState();
  const [isLoading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  //Load the ticker api info. Set the loading page to off once promise resolves
  useEffect(() => {
    fmp
      .stock(props.ticker)
      .quote()
      .then((response) => {
        setApiData(response);
        setLoading(false);
        props.addApiPort(response);
        setValue();
        // props.addValue(totalValue);
      });
  }, []);

  function handleRemove() {
    props.delete(props.id);
  }

  function setValue() {
    let total = props.holdings * props.average;
    setTotalValue(total);
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
            />
          ) : (
            <>
              {props.ticker} - Value : {value}
              <button onClick={handleRemove}>X</button>
              <button onClick={toggle}>Edit</button>
            </>
          )}
        </li>
      )}
    </div>
  );
}
