import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import HomePage from "../Homepage/Homepage";
import LoginPage from "../LoginPage/LoginPage";
import NavBar from "../../components/NavBar/NavBar";
import SearchPage from "../SearchPage/SearchPage";
import { myContext } from "../../contexts/UserContext";
import useToggleState from "../../hooks/toggleState";
import axios from "axios";
const token = process.env.REACT_APP_FMP_ID;
const rootURL = `https://financialmodelingprep.com/api/v3/quote/`;
const newsURL = `https://financialmodelingprep.com/api/v3/stock_news?limit=50&apikey=${token}`;
const tickerURL = `https://financialmodelingprep.com/api/v3/stock_news?tickers=`;
require("dotenv").config();
const fmp = require("financialmodelingprep")(process.env.REACT_APP_FMP_ID);

function App() {
  let [value, setValue] = useState(0);
  let [loggedIn, setLoggedIn] = useState(false);
  let [portList, setPortList] = useState([]);
  let [watchList, setWatchList] = useState([]);
  let [apiPortList, setApiPortList] = useState([]);
  let [apiWatchList, setApiWatchList] = useState([]);
  let [render, toggle] = useToggleState();

  //This is using context where I am checking if there is a User logged in for authorization and authentication
  const userObject = useContext(myContext);
  //This is to set if the user is logged in or logged out in the state. I use this so that useeffect can be updated per loggedin user
  useEffect(() => {
    if (userObject) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  //sets the state of the watch list, portfolio list, and base investment from the Usercontext which is the logged in user
  useEffect(() => {
    if (userObject) {
      let watchArr = [];
      let portArr = [];
      let apiPort = [];
      let portfolio = userObject.portfolio;
      //fetching API from API Stuff
      async function getData(ticker) {
        const response = await axios.get(`${rootURL + ticker}?apikey=${token}`);
        setApiPortList((apiPortList) => [...apiPortList, ...response.data]);
        return response;
      }

      for (let i = 0; i < portfolio.length; i++) {
        getData(portfolio[i].ticker);
      }

      //sets portfolio list
      userObject.portfolio.map((ticker) => portArr.push(ticker));
      setPortList((portList) => [...portList, ...portArr]);

      //sets watch list
      userObject.watch.map((ticker) => watchArr.push(ticker));
      setWatchList((watchList) => [...watchList, ...watchArr]);
    }
  }, [loggedIn]);

  //Function to add to portfolio list state
  let addPortList = async (newPort, ticker) => {
    setPortList((portList) => [...portList, newPort]);
    setApiPortList((apiPortList) => [...apiPortList, ...ticker]);
  };

  //Function to add to watch list state
  let addWatchList = (newWatch) => {
    setWatchList((watchList) => [...watchList, newWatch]);
  };
  //
  let addApiPort = async (newData) => {
    setApiPortList((apiPortList) => [...apiPortList, ...newData]);
  };

  //function to delete watchlist items and to make a call to the backend
  let deleteWItem = (id) => {
    axios
      .delete(`api/stocks/delwatch/${id}`)
      .then((res) => setWatchList(res.data.watch));
  };
  //function to delete portfolio items and to make a call to the backend
  let deletePItem = (id, tickerId) => {
    axios
      .delete(`api/stocks/delportfolio/${id}`)
      .then((res) => setPortList(res.data.portfolio));
    const apiPort = apiPortList.filter((items) => items.symbol !== tickerId);
    setApiPortList(apiPort);
  };

  //function to edit the portfolio
  let editPortoflioStock = (id, newAverage, newHoldings) => {
    let updatedStock = portList.map((stock) =>
      stock._id === id
        ? { ...stock, average: newAverage, holdings: newHoldings }
        : stock
    );
    setPortList(updatedStock);
  };

  return (
    <div className='App'>
      <NavBar />

      <Switch>
        <Route
          path='/'
          exact
          render={({ history }) => (
            <HomePage
              history={history}
              watchList={watchList}
              portList={portList}
              deleteWItem={deleteWItem}
              deletePItem={deletePItem}
              edit={editPortoflioStock}
              addApiPort={addApiPort}
            />
          )}
        />
        {userObject ? null : (
          <Route
            path='/login'
            exact
            render={({ history }) => <LoginPage history={history} />}
          />
        )}
        <Route
          path='/search'
          exact
          render={({ history }) => (
            <SearchPage
              history={history}
              addPort={addPortList}
              addWatch={addWatchList}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
