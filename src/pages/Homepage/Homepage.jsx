import React, { useState, useContext } from "react";
import { myContext } from "../../contexts/UserContext";
import WatchList from "../../components/WatchList/WatchList";
import PortList from "../../components/PortList/PortList";
import StockForm from "../../components/StockForm/StockForm";

export default function Homepage() {
  const context = useContext(myContext);
  let [value, setValue] = useState(0);
  let [portList, setPortList] = useState([]);
  let [watchList, setWatchList] = useState(["fight dog", "fight cat"]);

  let loginOrLogout = (
    <div>
      {context ? (
        <h1>Welcome Back {context.name}</h1>
      ) : (
        <h1>Welcome to Stocktracker</h1>
      )}
      <WatchList list={watchList} />
      <PortList />
      <StockForm />
    </div>
  );
  return <div>{loginOrLogout}</div>;
}
