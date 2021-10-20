import React from "react";
import Container from "react-bootstrap/Container";
import styles from "./SearchInfo.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import StockChart from "../StockChart/StockChart";

export default function SearchInfo(props) {
  var date = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });

  return props.quote === undefined ? (
    <Container className={styles.border}>
      <div className={styles.font}>Not a valid Ticker</div>
    </Container>
  ) : (
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
              ${props.quote.change} {props.quote.changesPercentage}%
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
        <Row className={styles.date}> As of {date} </Row>
      </div>
      <div>
        <Row>
          <Col lg='3'>
            <ListGroup variant='flush'>
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg='3'>Hello </Col>

          <Col lg='6' className={styles.chart}>
            <StockChart priceData={props.priceData} />
          </Col>
        </Row>
      </div>
    </Container>
  );
}
