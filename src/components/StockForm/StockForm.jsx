import React from "react";
import useInputState from "../../hooks/handleChange";

export default function StockForm() {
  const [ticker, updateTicker, resetTicker] = useInputState("");
  return (
    <div>
      {ticker}
      <form>
        <input
          type='text'
          placeholder='Ticker'
          value={ticker}
          onChange={updateTicker}
        />
        <button onClick={resetTicker}>Submit</button>
      </form>
    </div>
  );
}
