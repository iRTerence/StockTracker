import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import HomePage from "../Homepage/Homepage";
import LoginPage from "../LoginPage/LoginPage";
import NavBar from "../../components/NavBar/NavBar";

require("dotenv").config();

function App() {
  let [value, setValue] = useState(0);
  let [watchList, setWatchList] = useState([]);
  let [portList, setPortList] = useState([]);

  // const handleLogin = async (googleData) => {
  //   const res = await fetch("/api/users/login", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       token: googleData.tokenId,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await res.json();
  //   // store returned user in a context?
  // };

  // const responseSuccessGoogle = (response) => {
  //   axios({
  //     method: "POST",
  //     url: "http://localhost:3001/api/users/googlelogin/",
  //     data: { tokeId: response.tokenId },
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };

  // const responseFailGoogle = (response) => {
  //   console.log(response);
  // };

  // <GoogleLogin
  //   clientId='509611698431-7bdm59euoq3bdbql5jcusf0tvqu6c718.apps.googleusercontent.com'
  //   buttonText='Log in with Google'
  //   onSuccess={responseSuccessGoogle}
  //   onFailure={responseFailGoogle}
  //   cookiePolicy={"single_host_origin"}
  // />;

  return (
    <div className='App'>
      <NavBar />

      <Switch>
        <Route
          path='/'
          exact
          render={({ history }) => <HomePage history={history} />}
        />
        <Route
          path='/login'
          exact
          render={({ history }) => <LoginPage history={history} />}
        />
      </Switch>
    </div>
  );
}

export default App;
