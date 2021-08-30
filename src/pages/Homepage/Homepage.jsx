import React, { useState, useContext } from "react";
import { myContext } from "../../contexts/UserContext";
import WatchList from "../../components/WatchList/WatchList";
import PortList from "../../components/PortList/PortList";
import StockForm from "../../components/StockForm/StockForm";

export default function Homepage(props) {
  const context = useContext(myContext);

  let loginOrLogout = (
    <div>
      {context ? (
        <h1>Welcome Back {context.name}</h1>
      ) : (
        <h1>Welcome to Stocktracker</h1>
      )}
      <WatchList list={props.list} />
      <PortList />
    </div>
  );
  return <div>{loginOrLogout}</div>;
}
