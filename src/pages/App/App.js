import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import React, { useState } from "react";

function App() {
  let [value, setValue] = useState(0);
  let [watchList, setWatchList] = useState([]);
  let [portList, setPortList] = useState([]);

  return <div className='App'>Hello World</div>;
}

export default App;
