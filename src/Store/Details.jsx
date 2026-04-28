import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { api_config } from "../Config/API";
import { Accordion, Col } from "react-bootstrap";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import useFancybox from "../Context/FancyBox";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LangContext } from "../Context/LangContext";
import CardProducts from "./CardProducts";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import { WishlistContext } from "../Context/WishlistContext";

const Details = () => {
  const [fancyboxRef] = useFancybox({
    // Your custom options
  });

  const base_url = api_config.BASE_URL;
  const productsPath = api_config.ENDPOINTS.PRODUCT;

  const { lang } = useContext(LangContext);
  const{userInfo} = useContext(AuthContext)
  const{addToWishlist} = useContext(WishlistContext)

  const [product, setProduct] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [initialize, setInitialize] = useState(false);
  const [colors, setColors] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()

  const { addToCart } = useContext(CartContext);

  const { id } = useParams();

  const CallDetailsAPI = () => {
    setInitialize(false);
    fetch(`${base_url}${productsPath}/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No products found");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProduct(data.data);
        setGallery(data.data.images);
        setColors(data.data.colors);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        console.log("Call API Ended");
        setInitialize(true);
      });
  };

  const CallProductsAPI = () => {
    fetch(`${base_url}${productsPath}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No products found");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAllProducts(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        console.log("Call API Ended");
      });
  };

  useEffect(() => {
    CallDetailsAPI();
    CallProductsAPI();

    window.scrollTo(0, 0);
  }, [id]);

  if (!initialize) return <div className="loader"></div>;

  return (
    <>
      <Col lg={12}>
        <NavLink className="back" to="/products">
          {lang === "ltr" ? <FaArrowLeftLong /> : <FaArrowRightLong />} back
        </NavLink>
      </Col>
      <Col lg={6} sm={12} className="mt-5">
        <div ref={fancyboxRef}>
          {gallery[0] ? (
            <a key={product.id} data-fancybox="gallery" href={gallery[0]}>
              <img src={gallery[0]} alt={product.name} className="main-img" />
            </a>
          ) : (
            <a key={product.id} data-fancybox="gallery" href={product.image}>
              <img
                src={product.image}
                alt={product.name}
                className="main-img"
              />
            </a>
          )}
          <div className="gallery-container">
            {gallery.slice(1).map((gall, index) => (
              <a key={index} data-fancybox="gallery" href={gall}>
                <img src={gall} alt={product.name} className="gallery-item" />
              </a>
            ))}
          </div>
        </div>
      </Col>
      <Col lg={6} sm={12} className="mt-5 ps-5">
        <h2 className="product-title">{product.name}</h2>
        <p className="pdct-desc">{product.description}</p>
        <span className="pdct-price">${product.price}</span>
        <hr
          style={{
            border: "solid, 1px, var(--darkGrey)",
            marginBottom: "30px",
          }}
        />
        <div className="additionalInfo">
          <div>
            {colors.length > 0 ? (
              <span className="pdct-info">Colors: </span>
            ) : (
              <span></span>
            )}
            <span className="pdct-info">Category: </span>
          </div>
          <div>
            <div className="pdctColors">
              {colors.map((clr) => (
                <span className="colors" key={clr.id}>
                  {clr.name}
                </span>
              ))}
            </div>
            <span className="colors">{product.category.name}</span>
          </div>
        </div>
        <div className="mt-5 d-flex addBtns">
          <div className="quantityBtn">
            <button
              style={{
                borderStartStartRadius: "10px",
                borderEndStartRadius: "10px",
                border: "solid 2px var(--border)",
                borderInlineEnd: "none",
              }}
              onClick={() => {
                setQuantity((prev) => prev - 1);
              }}
              disabled={quantity === 1 ? "disabled" : ""}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              style={{
                borderEndEndRadius: "10px",
                borderStartEndRadius: "10px",
                border: "solid 2px var(--border)",
                borderInlineStart: "none",
              }}
              onClick={() => {
                setQuantity((prev) => prev + 1);
              }}
              disabled={quantity === 10 ? "disabled" : ""}
            >
              +
            </button>
          </div>
          <div className="w-100">
            <button
              className="cartBtn "
              onClick={() => {
                addToCart(product.id, quantity, product);
              }}
            >
              Add to Cart
            </button>
            <button
             className="whishlistBtn"
             onClick={()=>{
              userInfo?
              addToWishlist(product.id):
              navigate('/user/login')
             }}
            >{
              userInfo?
              `Add to Whishlist`:
              `Login`
              }
            </button>
          </div>
        </div>
        <div className="mb-5">
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="additionalTitles">
                Additional Information
              </Accordion.Header>
              <Accordion.Body className="additionalBody">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
                voluptate facere consequatur enim facilis quia non porro
                officiis earum minus molestiae, iste amet pariatur possimus
                doloribus libero ducimus commodi sint voluptas veniam corrupti
                nostrum nemo assumenda placeat? Sunt, facilis, et rerum quia at
                perspiciatis expedita esse libero est eos atque.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="additionalTitles">
                Questions
              </Accordion.Header>
              <Accordion.Body className="additionalBody">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
                voluptate facere consequatur enim facilis quia non porro
                officiis earum minus molestiae, iste amet pariatur possimus
                doloribus libero ducimus commodi sint voluptas veniam corrupti
                nostrum nemo assumenda placeat? Sunt, facilis, et rerum quia at
                perspiciatis expedita esse libero est eos atque.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header className="additionalTitles">
                Reviews
              </Accordion.Header>
              <Accordion.Body className="additionalBody">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
                voluptate facere consequatur enim facilis quia non porro
                officiis earum minus molestiae, iste amet pariatur possimus
                doloribus libero ducimus commodi sint voluptas veniam corrupti
                nostrum nemo assumenda placeat? Sunt, facilis, et rerum quia at
                perspiciatis expedita esse libero est eos atque.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Col>
      <Col lg={12} className="moreProducts">
        <h3>You might also like</h3>

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
          {allProducts.slice(1, 12).map((pdct) => (
            <SwiperSlide key={pdct.id}>
              <NavLink to={`/products/${pdct.id}`}>
                <CardProducts
                  key={pdct.id}
                  pdctImg={pdct.image}
                  pdctTitle={pdct.name}
                  pdctPrice={pdct.price}
                  pdctDesc={pdct.description}
                />
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </Col>
    </>
  );
};

export default Details;
