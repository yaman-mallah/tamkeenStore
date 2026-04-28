import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import './Newsletter.css'

const Newsletter = () => {
  return (
    <div className="subscribe">
      <Container>
        <Row>
          <Col lg={12}>
            <h3 className="RecTitle subTitle">Subscribe on our newsletter</h3>
            <p>
              Get daily news on upcoming offers from many suppliers all over the
              world
            </p>
            <form>
              <input type="text" placeholder="Email" />
              <button className="submit mt-lg-0 mt-3">Subscribe</button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Newsletter;
