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
        console.log(response.data);
      });
  }

  return (
    <div>
      {props.ticker}
      <form>
        Shares
        <input
          type='number'
          id='average'
          placeholder='Average Cost'
          onChange={handleChangeHoldings}
        />
        Average Cost
        <input
          type='number'
          id='holdings'
          placeholder='Stocks Held'
          onChange={handleChangeAverage}
        />
        <button onClick={edit}>Submit</button>
      </form>
    </div>
  );
}

export default EditForm;
