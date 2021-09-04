import React, { useState } from "react";
import useToggleState from "../../hooks/toggleState";
import EditForm from "../EditForm/EditForm";

export default function StockTickerItem(props) {
  const [isEditing, toggle] = useToggleState();

  function handleRemove() {
    props.delete(props.id);
  }

  return (
    <div>
      <li>
        {isEditing ? (
          <EditForm
            id={props.id}
            key={props.id}
            edit={props.edit}
            toggle={toggle}
            stocks={props.holding}
            average={props.average}
          />
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
