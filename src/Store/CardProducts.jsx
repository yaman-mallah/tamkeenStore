import React from "react";
import { Col } from "react-bootstrap";
import "./CardProducts.css";
import { NavLink } from "react-router";

const CardProducts = ({
  pdctImg,
  pdctPrice,
  pdctDesc,
  pdctTitle,
  pdctOldPrice,
  children,
  id,
}) => {
  return (
    <>
      <div className="ProductCard">
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
