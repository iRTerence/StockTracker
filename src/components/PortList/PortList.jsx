import React, { useState, useEffect, useContext } from "react";
import StockTickerItemP from "../StockTickerItemP/StockTickerItemP";
import { myContext } from "../../contexts/UserContext";
import axios from "axios";
import Table from "react-bootstrap/Table";
const token = process.env.REACT_APP_FMP_ID;
const rootURL = `https://financialmodelingprep.com/api/v3/quote/`;
const newsURL = `https://financialmodelingprep.com/api/v3/stock_news?limit=50&apikey=${token}`;
const tickerURL = `https://financialmodelingprep.com/api/v3/stock_news?tickers=`;
require("dotenv").config();

export default function PortList(props) {
  let [loaded, setLoaded] = useState(false);
  let [apiPortMap, setApiPortMap] = useState({});

  //start here
  const userObject = useContext(myContext);

  const toggle = () => {
    setLoaded(!loaded);
  };

  useEffect(() => {
    if (userObject) {
      async function getData(ticker) {
        const response = await axios
          .get(`${rootURL + ticker}?apikey=${token}`)
          .then((res) => {
            if (Array.isArray(res.data)) {
              const tickerMap = res.data.reduce((map, ticker) => {
                map[ticker.symbol] = ticker;
                return map;
              }, {});
              setApiPortMap((prevState) => ({ ...prevState, ...tickerMap }));
            }
          });

        return response;
      }

      async function loadData() {
        for (let i = 0; i < props.portList.length; i++) {
          await getData(props.portList[i].ticker);
        }

        toggle();
      }
      loadData();
    }
  }, [props.portList]);

  //add initial investment for portfolio
  function addBookCost() {
    if (props.portList !== 0) {
      const bookCost = props.portList.map(
        (element) => element.holdings * element.average
      );
      return bookCost.reduce((a, b) => a + b, 0).toFixed(2);
    }
  }

  function addMarketValue() {
    const marketValue = props.portList.map((element) => {
      // console.log({ portList: props.portList, element });
      if (apiPortMap[element.ticker]) {
        return element.holdings * apiPortMap[element.ticker].price;
      }
      return 0;
    });
    // console.log(marketValue, apiPortMap);
    return marketValue.reduce((a, b) => a + b, 0).toFixed(2);
  }

  function listItems() {
    if (props.portList !== 0) {
      const portList = props.portList.map((tickers) => {
        return (
          <StockTickerItemP
            ticker={tickers.ticker}
            key={tickers._id}
            id={tickers._id}
            delete={props.deletePitem}
            edit={props.edit}
            holdings={tickers.holdings}
            average={tickers.average}
            addApiPort={props.addApiPort}
            isLoading={props.isLoading}
            apiInfo={apiPortMap[tickers.ticker]}
          />
        );
      });
      return portList;
    } else {
      return <div> There are no items in your Portfolio!</div>;
    }
  }
  return (
    <div>
      <div> New stuff</div>
      <div>Port List</div>
      Initial Investment: {addBookCost()} Market Value:
      {props.isLoading ? (
        <>
          <div>{addMarketValue()}</div>
          <Table striped bordered hover variant='dark'>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Change</th>
                <th>Shares</th>
                <th>Average Cost / Share</th>
                <th>Market Value</th>
                <th>Daily Gain</th>
                <th>Total Gain</th>
                <th>Volume</th>
                <th>Avg Volume (3m)</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{listItems()}</tbody>
          </Table>
        </>
      ) : (
        <>
          <div>Loading</div>
        </>
      )}
    </div>
  );
}
