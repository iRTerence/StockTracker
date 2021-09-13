import React from "react";
import Container from "react-bootstrap/Container";
import styles from "./SearchInfo.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SearchInfo(props) {
  return (
    <Container className={styles.border}>
      <div className={styles.font}>
        <Row>
          <Col lg='8' className={styles.center}>
            <h3>
              {props.quote.name} ({props.quote.symbol})
            </h3>
            <div className={styles.price}>${props.quote.price}</div>

            <div
              className={
                props.quote.change >= 0 ? styles.positive : styles.negative
              }>
              {props.quote.change}% ${props.quote.changesPercentage}
            </div>
          </Col>
          <Col lg='2'>
            <div>
              <button onClick={props.addPort}>Add to Portfolio</button>
            </div>
          </Col>
          <Col lg='2'>
            <div>
              <button onClick={props.addWatch}>Add to Watchlist</button>
            </div>
          </Col>
        </Row>
        <Row> {props.quote.name} </Row>
      </div>
    </Container>
  );
}
