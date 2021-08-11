import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
require("dotenv").config();

function App() {
  let [value, setValue] = useState(0);
  let [watchList, setWatchList] = useState([]);
  let [portList, setPortList] = useState([]);

  const handleLogin = async (googleData) => {
    const res = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // store returned user in a context?
  };

  return (
    <div className='App'>
      <GoogleLogin
        clientId='509611698431-7bdm59euoq3bdbql5jcusf0tvqu6c718.apps.googleusercontent.com'
        buttonText='Log in with Google'
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default App;
