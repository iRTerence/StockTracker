import React, { useState, useEffect, useContext } from "react";
import StockTickerItem from "../StockTickerItemW/StockTickerItemW";
import { myContext } from "../../contexts/UserContext";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
const token = process.env.REACT_APP_FMP_ID;
const rootURL = `https://financialmodelingprep.com/api/v3/quote/`;

export default function WatchList(props) {
  let [loaded, setLoaded] = useState(false);
  let [apiWatchMap, setApiWatchMap] = useState({});
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
              setApiWatchMap((prevState) => ({ ...prevState, ...tickerMap }));
            }
          });

        return response;
      }

      async function loadData() {
        for (let i = 0; i < props.watchList.length; i++) {
          await getData(props.watchList[i].ticker);
        }

        setLoaded(true);
      }
      loadData();
    }
  }, [props.watchList]);

  function listItems() {
    if (props.watchList !== 0) {
      const watchList = props.watchList.map((tickers) => {
        return (
          <StockTickerItem
            ticker={tickers.ticker}
            key={tickers._id}
            id={tickers._id}
            deleteWItem={props.deleteWItem}
            apiWatchList={props.apiWatchList}
            apiInfo={apiWatchMap[tickers.ticker]}
            loaded={loaded}
          />
        );
      });
      return watchList;
    } else {
      return <div> There are no items in your watchlist!</div>;
    }
  }

  return (
    <div>
      <div>Watchlist</div>

      <Accordion>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            {loaded ? (
              <Table striped bordered hover variant='dark'>
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Last Price</th>
                    <th>Change</th>
                    <th>Change %</th>
                    <th>Day Range</th>
                    <th>52 Wk Range</th>
                    <th>Volume</th>
                    <th>Avg Volume (3m)</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{listItems()}</tbody>
              </Table>
            ) : (
              <> disaster </>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
