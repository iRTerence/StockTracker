import React, { useState } from "react";
import useToggleState from "../../hooks/toggleState";

export default function StockTickerItem(props) {
  const [isEditing, toggle] = useToggleState();

  function handleRemove() {
    props.delete(props.id);
  }
  return (
    <div>
      <li>
        {isEditing ? (
          <h1>EDITING TIME</h1>
        ) : (
          <>
            {props.ticker}
            <button onClick={handleRemove}>X</button>
            <button onClick={toggle}>Edit</button>
          </>
        )}
      </li>
    </div>
  );
}
