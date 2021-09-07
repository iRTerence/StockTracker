import axios from "axios";
import React from "react";
import handleChangeInput from "../../hooks/handleChange";

function EditForm(props) {
  const [holdingsValue, handleChangeHoldings, resetHoldings] =
    handleChangeInput("");
  const [averageValue, handleChangeAverage, resetAverage] =
    handleChangeInput("");

  //used to send axios request and then change state after editing a stocks average price/stocksheld
  function edit(e) {
    e.preventDefault();
    axios
      .put(`api/stocks/editportfolio/${props.id}`, {
        average: averageValue,
        holdings: holdingsValue,
      })
      .then((response) => {
        props.edit(props.id, averageValue, holdingsValue);
        props.toggle();
        props.marketCost();
      });
  }

  return (
    <div>
      {props.ticker}
      <form>
        Shares
        <input
          defaultValue={props.shares}
          type='number'
          id='holdings'
          placeholder='Stocks held'
          onChange={handleChangeHoldings}
        />
        Average Cost
        <input
          defaultValue={props.average}
          type='number'
          id='average'
          placeholder='Average Cost'
          onChange={handleChangeAverage}
        />
        <button onClick={edit}>Submit</button>
      </form>
    </div>
  );
}

export default EditForm;
