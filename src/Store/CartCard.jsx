import React, { useContext } from "react";
import { IoCloseOutline } from "react-icons/io5";

import "./CardProducts.css";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";

const CartCard = ({
  cartImg,
  cartTitle,
  cartQuantity,
  children,
  cartPrice,
  cartId,
}) => {
  const { deleteFromCart } = useContext(CartContext);
  return (
    <div className="cartCard">
      <div className="cartDetails">
        <img src={cartImg} alt={cartTitle} className="cartImg" />
        <div className="itemTitles">
          <span className="cartTitle">{cartTitle}</span>
          <span className="cartQuantity">quantity: {cartQuantity}</span>
          {children}
        </div>
      </div>
      <div className="delete">
        <span className="cartPrice">{cartPrice}$</span>
        <button
          className="deleteBtn"
          onClick={() => {
            deleteFromCart(cartId);
          }}
        >
          <IoCloseOutline />
        </button>
      </div>
    </div>
  );
};

export default CartCard;

export const WishlistCard = ({
  wishlistImg,
  wishlistTitle,
  wishlistPrice,
  wishlistId,
  productId,
  children,
  product
}) => {
  const { deleteFromWishlist } = useContext(WishlistContext);
  const {addToCart} = useContext(CartContext)

  return (
    <div className="cartCard">
      <div className="cartDetails">
        <img src={wishlistImg} alt={wishlistTitle} className="cartImg" />
        <div className="itemTitles">
          <span className="cartTitle">{wishlistTitle}</span>
        </div>
        
      </div>
      <div className="wishlistEnd">
          <button className="cartBtn"
        onClick={()=>{
          addToCart(productId,1,product)
        }}
        >Add to cart</button>
        
      <div className="delete">
        <span className="cartPrice">{wishlistPrice}$</span>
        <button
          className="deleteBtn"
          onClick={() => {
               deleteFromWishlist(wishlistId)
          }}
        >
          <IoCloseOutline />
        </button>
      </div>
      </div>
    </div>
  );
};
