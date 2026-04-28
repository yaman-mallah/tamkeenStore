import React from "react";
import "./OfferCards.css";
import { NavLink } from "react-router";

const OfferCards = ({
  productTitle,
  productPrice,
  offerPercentage,
  productImage,
  cardOfferStyle,
  children
}) => {
  return (
      <div className={cardOfferStyle}>
      <img src={productImage} alt={productTitle} />
      <div>
        <span href="#" className="productTitle">
          {productTitle}
        </span>
        <span className="offer">{offerPercentage}</span>
        <span className="productPrice">{productPrice}</span>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default OfferCards;
