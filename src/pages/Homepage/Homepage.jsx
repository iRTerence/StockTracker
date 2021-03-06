import React, { useState, useContext } from "react";
import { myContext } from "../../contexts/UserContext";
import WatchList from "../../components/WatchList/WatchList";
import PortList from "../../components/PortList/PortList";
import Accordion from "react-bootstrap/Accordion";
import styles from "./Hompage.module.css";

function Homepage(props) {
  const context = useContext(myContext);

  let loginOrLogout = (
    <div>
      {context ? (
        <h1 className={styles.greyfont}>Welcome Back {context.name}</h1>
      ) : (
        <h1>Welcome to Stocktracker</h1>
      )}
      <PortList
        portList={props.portList}
        deletePitem={props.deletePItem}
        edit={props.edit}
        apiPortList={props.apiPortList}
        addApiPort={props.addApiPort}
        isLoading={props.isLoading}
        portTickers={props.portTickers}
      />
      <WatchList
        watchList={props.watchList}
        deleteWItem={props.deleteWItem}
        apiWatchList={props.apiWatchList}
        watchTickers={props.watchTickers}
      />
    </div>
  );
  return <div>{loginOrLogout}</div>;
}

export default Homepage;
