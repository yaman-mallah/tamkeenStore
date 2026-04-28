import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api_config } from "../Config/API";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { userInfo } = useContext(AuthContext);

  const [wishlistItems, setWishlistItems] = useState([]);
  const [addWishlist, setAddWishlist] = useState({
    product_id: null,
  });
  const [error, setError] = useState();

  const base_url = api_config.BASE_URL;
  const wishlistPath = api_config.ENDPOINTS.FAVORITE;

  const callWishlistAPI = () => {
    const storeData = localStorage.getItem("userData");
    const token = JSON.parse(storeData)?.data?.token;

    console.log(token);

    fetch(`${base_url}${wishlistPath}`, {
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
        setWishlistItems(data.data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      })
      .finally(() => {
        console.log("API Call ended");
      });
  };

  const CallAddToWishlistAPI = (dataToPost) => {
    const storeData = localStorage.getItem("userData");
    const token = JSON.parse(storeData)?.data?.token;

    fetch(`${base_url}${wishlistPath}`, {
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
        callWishlistAPI();
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  const addToWishlist = (product_id) => {
    const existingItem = wishlistItems.find(
      (item) => item.product.id === product_id,
    );

    if (existingItem) {
        return;
    }
    const payload = {
        product_id: String(product_id),
      };
      CallAddToWishlistAPI(payload);
    }

  const deleteFromWishlist = (wishlistId) => {
      const storeData = localStorage.getItem("userData");
      const token = JSON.parse(storeData)?.data?.token;
      fetch(`${base_url}${wishlistPath}/${wishlistId}`, {
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
          callWishlistAPI();
        })
        .catch((err) => {
          setError(err.message);
          console.log(err);
        })
        .finally(() => {
          console.log("API Call ended");
        });
  };


  useEffect(() => {
     if(userInfo){
        callWishlistAPI() 
     }
  }, [userInfo]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        deleteFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
