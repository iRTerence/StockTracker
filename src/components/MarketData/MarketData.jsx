import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import axios from "axios";
import styles from "./MarketData.module.css";
const token = process.env.REACT_APP_FMP_ID;
const majorIndexURL = `https://financialmodelingprep.com/api/v3/quotes/index?apikey=${token}`;

export default function MarketData() {
  let [marketList, setMarketList] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function marketData() {
      let response = await axios.get(majorIndexURL);
      setMarketList(response.data);
      setIsLoading(false);
    }
    marketData();
  }, []);

  let display = (
    <>
      {isLoading && marketList.length >= 63 ? (
        <div>Loading</div>
      ) : (
        <Marquee gradient={false} className={styles.marquee}>
          {marketList.map((item) => {
            return (
              <span key={item.symbol} className={styles.tickerdata}>
                {item.symbol} {item.price}
                <span
                  className={
                    item.change > 0 ? styles.positive : styles.negative
                  }>
                  ${item.change.toFixed(2)} {item.changesPercentage.toFixed(2)}%
                </span>
              </span>
            );
          })}
        </Marquee>
      )}
    </>
  );

  return <div>{display}</div>;
}
