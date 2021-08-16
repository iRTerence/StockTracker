import React, { useState, useContext } from "react";
import { myContext } from "../../contexts/UserContext";

export default function Homepage() {
  const context = useContext(myContext);

  let loginOrLogout = (
    <div>
      {context ? (
        <h1>Welcome Back {context.name}</h1>
      ) : (
        <h1>Welcome to Stocktracker</h1>
      )}
    </div>
  );
  return <div>{loginOrLogout}</div>;
}
