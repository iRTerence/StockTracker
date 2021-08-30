import React from "react";
import useInputState from "../../hooks/handleChange";
import axios from "axios";

export default function StockForm(props) {
  const [ticker, updateTicker, resetTicker] = useInputState("");

  //Sends a post request with axios to save the ticker to the user's watchlist
  const addWatch = async (event) => {
    event.preventDefault();

    try {
      axios.post("api/stocks/addwatch", { ticker }).then((response) => {
        let lastItem = response.data.watch.length - 1;
        props.addWatch(response.data.watch[lastItem]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Sends a post request with axios to save the ticker to the user's portfoliolist
  const addPort = async (event) => {
    event.preventDefault();

    try {
      axios.post("api/stocks/addport", { ticker }).then((response) => {
        let lastItem = response.data.portfolio.length - 1;
        props.addPort(response.data.portfolio[lastItem]);
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
