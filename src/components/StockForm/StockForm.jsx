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

  // const addPort = async (event) => {
  //   event.preventDefault();
  //   try {
  //     let firstData = await axios.post("api/stocks/addport", { ticker });
  // let apiData = await axios.get(`${rootURL + ticker}?apikey=${token}`);
  //     let lastItem = firstData.data.portfolio.length - 1;
  //     await props.addPort(apiData.data.portfolio[lastItem], apiData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //
  const addPort = async (event) => {
    event.preventDefault();
    try {
      axios.post("api/stocks/addport", { ticker }).then((response) => {
        let lastItem = response.data.portfolio.length - 1;
        axios.get(`${rootURL + ticker}?apikey=${token}`).then((res) => {
          props.addPort(response.data.portfolio[lastItem], [res.data[0]]);
        });

        console.log(response.data.portfolio);
        // props.addPort(response.data.portfolio[lastItem], []);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // Sends a post request with axios to save the ticker to the user's portfoliolist
  // const addPort = async (event) => {
  //   event.preventDefault();
  //   try {
  //     axios.post("api/stocks/addport", { ticker }).then((response) => {
  //       let lastItem = response.data.portfolio.length - 1;
  //       console.log(response.data.portfolio);
  //       props.addPort(response.data.portfolio[lastItem], []);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
