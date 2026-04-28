import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Newsletter from "../Components/Newsletter";
import "./OurServices.css";
import { Images } from "../Utils/Imgs";

<style></style>;

const AboutUs = () => {
  return (
    <>
      <Container>
        <Row>
          <Col sm={12}>
            <h1 className="ServiceTitle">About Us</h1>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col lg={6} sm={12}>
            <h2 className="service-subtitle">Who We Are</h2>
            <p className="about-par">
              Brocelle is your all-in-one e-commerce destination, created to
              simplify the way you shop online. In a world full of endless
              options, we bring everything together in one place—making it
              easier for you to find what you need without the hassle. Our
              platform is designed for convenience, speed, and reliability, so
              you can shop with confidence anytime, anywhere.
            </p>
          </Col>
          <Col
            lg={6}
            sm={12}
            className="serviceBg"
            style={{
              backgroundImage: `url(${Images.aboutTemplate1})`,
            }}
          ></Col>
        </Row>
        <Row className="mb-5">
          <Col
            lg={6}
            sm={12}
            className="serviceBg"
            style={{
              backgroundImage: `url(${Images.aboutTemplate2})`,
            }}
          ></Col>
          <Col lg={6} sm={12}>
            <h2 className="service-subtitle">What We Offer</h2>
            <p className="about-par">
              At Brocelle, we offer a wide and ever-growing range of products to
              suit every lifestyle. From everyday essentials to trending items,
              from practical solutions to thoughtful gifts, our goal is to make
              sure you never have to look elsewhere. We carefully select and
              update our catalog to ensure variety, quality, and relevance,
              giving you access to products that truly add value to your life.
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h2 className="service-subtitle">Our Mission & Why Choose Brocelle</h2>
            <p className="about-par">
              Our mission is to make online shopping effortless, accessible, and
              enjoyable for everyone—and that mission shapes everything we do.
              At Brocelle, we combine a wide selection of products with a
              seamless, user-friendly experience designed to save you time and
              effort. We focus on making every step, from browsing to checkout,
              simple, secure, and efficient. With our commitment to convenience,
              quality, and reliability, Brocelle becomes more than just a
              shopping platform—it becomes your trusted place to find exactly
              what you need, whenever you need it.
            </p>
          </Col>
        </Row>
                <Row>
          <Col
            sm={12}
            className="serviceBg"
            style={{
              backgroundImage: `url(${Images.aboutTemplate3})`,
              height: '550px'
            }}
          ></Col>
        </Row>
      </Container>
      <Newsletter />
    </>
  );
};

export default AboutUs;
