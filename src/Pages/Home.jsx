import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Home.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import OfferCards from "./HomeComponents/OfferCards";
import { Link, NavLink, useNavigate } from "react-router";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LangContext } from "../Context/LangContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import CardProducts from "../Store/CardProducts";
import Newsletter from "../Components/Newsletter";
import Suppliers from "./HomeComponents/Suppliers";
import { Images } from "../Utils/Imgs";

const Home = () => {
  useEffect(() => {
    AOS.init({});
  }, []);

  const navigate = useNavigate();

  const { lang } = useContext(LangContext);

  const base_url = "https://training.tamkeen-dev.com/tamkeenstore/public/api";
  const productsPath = "/product";

  const [error, setError] = useState();
  const [products, setProducts] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetch(`${base_url}${productsPath}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      })
      .finally(() => {
        console.log("API Call ended");
      });
      fetch("/regions.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setRegions(data);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      })
      .finally(() => {
        console.log("API Call ended");
      });
  }, []);


  return (
    <>
      <Container>
        <Row>
          <Col className="hero-bg" sm={12}>
            <img
              src={Images.Hero}
              alt="hero"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-offset="200"
              data-aos-delay="800"
            />
            <h1
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-offset="300"
              data-aos-delay="400"
            >
              Brocelle
            </h1>
            <span
              data-aos="fade-down"
              data-aos-duration="2000"
              data-aos-delay="1200"
              className="hero-span"
            >
              The World of Shopping, Delivered to You
            </span>
            <h5
              data-aos="fade-right"
              data-aos-duration="2000"
              data-aos-offset="100"
              data-aos-delay="1800"
            >
              Brocelle - The World of Shopping, Delivered to You
            </h5>
            <p
              data-aos="fade-right"
              data-aos-duration="2300"
              data-aos-offset="100"
              data-aos-delay="2300"
            >
              At{" "}
              <span style={{ color: "var(--red)", fontWeight: "500" }}>
                {" "}
                Brocelle
              </span>
              , everything you need is just a click away. Discover great
              products, enjoy seamless shopping, and get it delivered with ease.
            </p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col sm={12} className="col-sec">
            <div>
              <h2>Deals & Offers</h2>
              <span>Limited time discounts on our top products </span>
            </div>
            <Nav.Link as={Link} to="/products" className="viewLink">
              View all
              {lang === "ltr" ? <FaArrowRightLong /> : <FaArrowLeftLong />}
            </Nav.Link>
          </Col>
          <Col sm={12}>
            <Swiper
              className="offerSwiper"
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={2}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              breakpoints={{
                // width >= 640px
                576: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                // width >= 768px
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                // width >= 1024px
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1400: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
            >
              {products.slice(3, 8).map((pdct) => (
                <SwiperSlide key={pdct.id}>
                  <OfferCards
                    productTitle={pdct.title}
                    offerPercentage={`${pdct.price} SP`}
                    productImage={pdct.image}
                    cardOfferStyle="OfferCard"
                  >
                    <button
                      className="dealBtn"
                      onClick={() => {
                        navigate(`/products/${pdct.id}`);
                      }}
                    >
                      View Deal
                    </button>
                  </OfferCards>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col sm={12} className="col-sec mb-4">
            <div>
              <h2>Explore Our Collections</h2>
            </div>
            <Nav.Link as={Link} to="/products" className="viewLink">
              View all
              {lang === "ltr" ? <FaArrowRightLong /> : <FaArrowLeftLong />}
            </Nav.Link>
          </Col>
          <Col lg={3} sm={12} className="HomeProductsbg">
            <h3 className="Source-title">Home and outdoor</h3>
            <button
              className="sourceBtn"
              onClick={() => {
                navigate("/products");
              }}
            >
              Source now
            </button>
          </Col>
          <Col lg={9} sm={12} className="sources mt-lg-0 mt-3">
            <Swiper
              className="offerSwiper"
              navigation={true}
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={2}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              breakpoints={{
                // width >= 640px
                576: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                // width >= 768px
                768: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                // width >= 1024px
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                1400: {
                  slidesPerView: 4,
                  spaceBetween: 5,
                },
              }}
            >
              {products.slice(4, 12).map((pdct) => (
                <SwiperSlide key={pdct.id}>
                  <OfferCards
                    key={pdct.id}
                    cardOfferStyle="SourceCard"
                    productImage={pdct.image}
                    productTitle={pdct.name}
                    productPrice={`From USD ${pdct.price}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={3} sm={12} className="ElectronicProductsbg">
            <h3 className="Source-title">Consumer electronics and gadgets</h3>
            <button
              className="sourceBtn"
              onClick={() => {
                navigate("/products");
              }}
            >
              Source now
            </button>
          </Col>
          <Col lg={9} sm={12} className="sources mt-lg-0 mt-3">
            <Swiper
              className="offerSwiper"
              navigation={true}
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={2}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              breakpoints={{
                // width >= 640px
                576: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                // width >= 768px
                768: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                // width >= 1024px
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                1400: {
                  slidesPerView: 4,
                  spaceBetween: 5,
                },
              }}
            >
              {products.slice(7, 15).map((pdct) => (
                <SwiperSlide key={pdct.id}>
                  <OfferCards
                    key={pdct.id}
                    cardOfferStyle="SourceCard"
                    productImage={pdct.image}
                    productTitle={pdct.name}
                    productPrice={`From USD ${pdct.price}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>

        <Row className="msgSuppliers mt-5">
          <Col lg={4} sm={7} className="msgTitle">
            <h2 className="mb-lg-0 mb-3">
              An easy way to send requests to all suppliers
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </Col>
          <Col lg={3}></Col>
          <Col lg={5}>
            <div className="SendCard">
              <h3>Send quote to suppliers</h3>
              <form>
                <input type="text" placeholder="What item you need?" />
                <textarea
                  name=""
                  id=""
                  placeholder="Type more details"
                ></textarea>
                <div className="quantitySelector">
                  <input type="text" placeholder="Quantity" />
                  <select name="" id="" defaultValue="Pcs">
                    <option value="Pcs" disabled hidden>
                      Pcs
                    </option>
                  </select>
                </div>
                <button className="submit">Send inquiry</button>
              </form>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col sm={12} className="col-sec mb-4">
            <div>
              <h2>Recommended items</h2>
            </div>
            <Nav.Link as={Link} to="/products" className="viewLink">
              View all
              {lang === "ltr" ? <FaArrowRightLong /> : <FaArrowLeftLong />}
            </Nav.Link>
          </Col>
          {products.slice(3, 11).map((pdct) => (
            <Col lg={3} md={6} className="mb-3" key={pdct.id}>
              <NavLink to={`products/${pdct.id}`}>
                <CardProducts
                  pdctImg={pdct.image}
                  pdctPrice={pdct.price}
                  pdctDesc={pdct.description}
                />
              </NavLink>
            </Col>
          ))}
        </Row>
        <Row className="mt-5">
          <Col sm={12} className="col-sec mb-4">
            <div>
              <h2>Suppliers by Region</h2>
            </div>
          </Col>
          {regions.map((reg) => (
            <Col lg={3} sm={6} key={reg.id} className="mb-3">
              <Suppliers
                regionFlag={reg.flag}
                regionName={reg.regionName}
                shopName={reg.shopName}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <Newsletter />
    </>
  );
};

export default Home;
