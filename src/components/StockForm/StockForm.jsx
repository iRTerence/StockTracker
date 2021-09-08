import React from "react";
import useInputState from "../../hooks/handleChange";
import axios from "axios";
const token = process.env.REACT_APP_FMP_ID;
const rootURL = `https://financialmodelingprep.com/api/v3/quote/`;

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

  const addPort = async (event) => {
    event.preventDefault();
    try {
      axios.post("api/stocks/addport", { ticker }).then((response) => {
        let lastItem = response.data.portfolio.length - 1;
        axios.get(`${rootURL + ticker}?apikey=${token}`).then((res) => {
          props.addPort(response.data.portfolio[lastItem], [res.data[0]]);
        });
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
        <button onClick={addPort}>Add to Portfolio</button>
        <button onClick={addWatch}>Add to Watchlist</button>
      </form>
    </div>
  );
}
