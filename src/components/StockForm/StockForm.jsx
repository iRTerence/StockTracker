import React from "react";
import useInputState from "../../hooks/handleChange";
import axios from "axios";

export default function StockForm(props) {
  const [ticker, updateTicker, resetTicker] = useInputState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.addPort(ticker);

    try {
      axios.post("api/stocks/add", { ticker }).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {ticker}
      <form>
        <input
          type='text'
          placeholder='Ticker'
          value={ticker}
          onChange={updateTicker}
          id='ticker'
          name='ticker'
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
