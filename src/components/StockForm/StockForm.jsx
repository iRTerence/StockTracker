import React, { useState } from "react";
import useInputState from "../../hooks/handleChange";
import axios from "axios";
import SearchInfo from "../SearchInfo/SearchInfo";
const token = process.env.REACT_APP_FMP_ID;
const rootURL = `https://financialmodelingprep.com/api/v3/quote/`;

export default function StockForm(props) {
  const [ticker, updateTicker, resetTicker] = useInputState("");
  const [quote, setQuote] = useState();
  const [rating, setRating] = useState();
  const [priceData, setPriceData] = useState([]);
  const [loaded, setLoaded] = useState(false);

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

  const getData = async (event) => {
    event.preventDefault();
    var todayDate = new Date().toISOString().slice(0, 10);
    let daysAndMonths = todayDate.slice(4, 10);
    let lastYearDate = (new Date().getFullYear() - 1)
      .toString()
      .split("")
      .concat(daysAndMonths)
      .join("");
    let quote = `https://financialmodelingprep.com/api/v3/quote/${ticker.toUpperCase()}?apikey=${token}`;
    let rating = `https://financialmodelingprep.com/api/v3/rating/${ticker.toUpperCase()}?apikey=${token}`;
    let priceData = `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker.toUpperCase()}?from=${lastYearDate}&to=${todayDate}&apikey=${token}`;
    let urls = [quote, rating, priceData];
    let newUrls = [];

    //Spreading the array and using Axios for the concurrent get request
    function urlSpread() {
      for (let url of urls) {
        newUrls.push(axios.get(url));
      }
    }
    urlSpread();

    try {
      await axios.all([...newUrls]).then((responseArr) => {
        console.log(responseArr);

        setQuote(responseArr[0].data[0]);
        setRating(responseArr[1].data[0]);
        setPriceData(responseArr[2].data);
        setLoaded(true);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <input
          type='text'
          placeholder='Ticker'
          value={ticker}
          onChange={updateTicker}
          id='ticker'
          name='ticker'
        />
        <button onClick={getData}>Search!</button>
      </form>
      {loaded ? (
        <SearchInfo
          quote={quote}
          rating={rating}
          priceData={priceData}
          addWatch={addWatch}
          addPort={addPort}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
