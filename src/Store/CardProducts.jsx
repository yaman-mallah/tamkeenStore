import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import "./CardProducts.css";
import { NavLink } from "react-router";
import AOS from "aos";

import "aos/dist/aos.css";

const CardProducts = ({
  pdctImg,
  pdctPrice,
  pdctDesc,
  pdctTitle,
  pdctOldPrice,
  children,
  id,
}) => {
      useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true,   
        easing: "cubic-bezier(0.25, 0.1, 0.17, 0.8)",
        offset:150,
      });
  
    }, []);
  return (
    <>
      <div className="ProductCard"  data-aos={'fade-up'} data-aos-delay="100">
        <img src={pdctImg} alt={pdctTitle} />
        <div>
          <div>
             <span className="pdctTitle">{pdctTitle}</span>
            <span className="pdctPrice">{pdctPrice}</span>
            <span className="pdctOldPrice">{pdctOldPrice}</span>
            <span className="pdctDesc">{pdctDesc}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProducts;
