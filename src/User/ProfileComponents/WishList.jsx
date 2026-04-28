import { useContext, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { WishlistCard } from "../../Store/CartCard";

const WishList = () => {
  const { wishlistItems } = useContext(WishlistContext);
  const [quantity, setQuantity] = useState(0);
  return (
    <>
      <h3>Your Wishlist</h3>
      <div>
        {wishlistItems.map((item) => (
          <div
            style={{
              borderBottom: "solid 2px var(--border)",
              paddingBottom: "20px",
              paddingTop: "20px",
            }}
            key={item.id}
          >
            <WishlistCard
              wishlistImg={item.product.image}
              wishlistTitle={item.product.name}
              wishlistPrice={item.product.price}
              wishlistId={item.id}
              productId={item.product.id}
              product={item.product}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default WishList;
