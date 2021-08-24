import React from "react";
import StockForm from "../../components/StockForm/StockForm";

export default function SearchPage(props) {
  return (
    <div>
      <StockForm addPort={props.addPort} />
    </div>
  );
}
