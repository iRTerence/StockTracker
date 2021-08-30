import React from "react";
import useInputState from "../../hooks/handleChange";
import axios from "axios";

export default function StockForm(props) {
  const [ticker, updateTicker, resetTicker] = useInputState("");

  const addWatch = async (event) => {
    event.preventDefault();
    props.addWatch(ticker);

    try {
      axios.post("api/stocks/addwatch", { ticker }).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addPort = async (event) => {
    event.preventDefault();
    props.addPort(ticker);

    try {
      axios.post("api/stocks/addport", { ticker }).then((response) => {
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
        <button onClick={addWatch}>Add to Watchlist</button>
        <button onClick={addPort}>Add to Portfolio</button>
      </form>
    </div>
  );
}
