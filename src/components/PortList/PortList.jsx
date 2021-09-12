import React, { useState, useEffect, useContext } from "react";
import StockTickerItemP from "../StockTickerItemP/StockTickerItemP";
import { myContext } from "../../contexts/UserContext";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import styles from "./PortList.module.css";
const token = process.env.REACT_APP_FMP_ID;
const rootURL = `https://financialmodelingprep.com/api/v3/quote/`;
require("dotenv").config();

export default function PortList(props) {
  let [loaded, setLoaded] = useState(false);
  let [apiPortMap, setApiPortMap] = useState({});

  //start here
  const userObject = useContext(myContext);

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

        setLoaded(true);
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
      if (apiPortMap[element.ticker]) {
        return element.holdings * apiPortMap[element.ticker].price;
      }
      return 0;
    });
    return parseInt(marketValue.reduce((a, b) => a + b, 0).toFixed(2));
  }

  function dailyGain() {
    const dailyGain = props.portList.map((element) => {
      if (apiPortMap[element.ticker]) {
        return element.holdings * apiPortMap[element.ticker].change;
      }
      return 0;
    });
    return parseInt(dailyGain.reduce((a, b) => a + b, 0).toFixed(2));
  }

  function dailyChangePercentage() {
    let marketValue = addMarketValue();
    let total = marketValue + dailyGain();

    return (((total - marketValue) / marketValue) * 100).toFixed(2);
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
            apiInfo={apiPortMap[tickers.ticker]}
            loaded={loaded}
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
      <Accordion flush>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>
            {loaded ? (
              <div>
                <span className={styles.greyfont}>
                  {userObject.name}'s Portfolio
                </span>
                <div className={styles.current}>${addMarketValue()}</div>
                <div
                  className={
                    dailyChangePercentage() >= 0
                      ? styles.positive
                      : styles.negative
                  }>
                  {dailyChangePercentage()}% ${dailyGain()}
                </div>
              </div>
            ) : (
              <></>
            )}
          </Accordion.Header>
          <Accordion.Body>
            {loaded ? (
              <>
                <div></div>
                <Table striped bordered hover variant='dark'>
                  <thead>
                    <tr>
                      <th>Ticker</th>
                      <th>Change</th>
                      <th>Shares</th>
                      <th>Average Cost</th>
                      <th>Market Value</th>
                      <th>Book Cost</th>
                      <th>Daily Gain</th>
                      <th>Total Gain</th>
                      <th>Avg Volume (3m)</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>{listItems()}</tbody>
                </Table>
                {dailyGain()}
              </>
            ) : (
              <>
                <div>Loading</div>
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
