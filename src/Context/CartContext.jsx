import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api_config } from "../Config/API";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userInfo } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);
  const [addCart, setAddCart] = useState({
    product_id: null,
    quantity: null,
  });
  const [error, setError] = useState();

  const base_url = api_config.BASE_URL;
  const cartPath = api_config.ENDPOINTS.CART;

  const callCartAPI = () => {
    const storeData = localStorage.getItem("userData");
    const token = JSON.parse(storeData)?.data?.token;

    console.log(token);

    fetch(`${base_url}${cartPath}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Couldn't get Cart");
        }
        return res.json();
      })
      .then((data) => {
        setCartItems(data.data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      })
      .finally(() => {
        console.log("API Call ended");
      });
  };

  const CallAddToCartAPI = (dataToPost) => {
    const storeData = localStorage.getItem("userData");
    const token = JSON.parse(storeData)?.data?.token;

    console.log(token);

    fetch(`${base_url}${cartPath}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataToPost),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw err;
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        callCartAPI();
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  const addToCart = (product_id, qty, product) => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product_id,
    );
    const finalQty = existingItem ? existingItem.quantity + qty : qty;

    if (userInfo) {
      const payload = {
        product_id: String(product_id),
        quantity: finalQty,
      };
      CallAddToCartAPI(payload);
    } else {
      const cartData = JSON.parse(localStorage.getItem("cart"));
      if (existingItem) {
        cartItems.map((item) => {
          if (item.product.id === product_id) item.quantity = finalQty;
        });
        localStorage.setItem("cart", JSON.stringify(cartItems));
      } else {
        const newId =
          cartData.length > 0
            ? Math.max(...cartData.map((item) => item.id)) + 1
            : 1;
        const newItem = {
          id: newId,
          quantity: finalQty,
          product: product,
          productVariant: null,
        };

        const updatedCart = [...cartData, newItem];
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }
  };

  const deleteFromCart = (cartId) => {
    if (userInfo) {
      const storeData = localStorage.getItem("userData");
      const token = JSON.parse(storeData)?.data?.token;
      fetch(`${base_url}${cartPath}/${cartId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((serverError) => {
              throw new Error(serverError.message);
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          callCartAPI();
        })
        .catch((err) => {
          setError(err.message);
          console.log(err);
        })
        .finally(() => {
          console.log("API Call ended");
        });
    } else {
      const cartData = JSON.parse(localStorage.getItem("cart"));
      const updatedCart = cartData.filter((item) => item.id !== cartId);
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const updateQuantity = (productId, newQty) => {
    const payload = {
      product_id: String(productId),
      quantity: newQty,
    };

    if (userInfo) {
      CallAddToCartAPI(payload);
    } else {
      const cartData = JSON.parse(localStorage.getItem("cart"));
      cartData.map((item) => {
        if (productId === item.product.id) {
          item.quantity = newQty;
        }
      });
      setCartItems(cartData);
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  };

  const totalCartPrice = useMemo(() => {
    let total = 0;

    cartItems.forEach((item) => {
      total += item.quantity * item.product.price;
    });

    return total;
  }, [cartItems]);

  const clearCart = () => {
    
  };

  const mergeCart = (token) => {
    const localCartData = JSON.parse(localStorage.getItem("cart"));
    if (localCartData.length === 0) return;

    fetch(`${base_url}${cartPath}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Couldn't get Cart");
        }
        return res.json();
      })
      .then((data) => {
        const apiCart = data.data;

        localCartData.forEach((localItem, index) => {
          const existingItem = apiCart.find(
            (item) => item.product?.id === localItem.product.id,
          );

          let finalQty;
          if (existingItem) {
            if (existingItem.quantity !== localItem.quantity) {
              finalQty = localItem.quantity + existingItem.quantity;
            }
            else {
            finalQty = localItem.quantity;
          }
          } 
          else {
            finalQty = localItem.quantity;
          }

          const payload = {
            product_id: String(localItem.product.id),
            quantity: finalQty,
          };
          CallAddToCartAPI(payload);
        })
      })
      .catch((err)=>{
        setError(err.message)
      })
      .finally(()=>{
        console.log("API Call ended")
      })
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    {
      localStorage.getItem("userData") ? callCartAPI() : setCartItems(cartData);
    }
  }, [userInfo]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        deleteFromCart,
        updateQuantity,
        totalCartPrice,
        mergeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
