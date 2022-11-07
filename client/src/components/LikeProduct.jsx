import { React, useState, useEffect, useContext } from "react";
import { Context } from "..";

const LikeProduct = (product) => {
  const [favouriteProd, setFavouriteProd] = useState(false);
  const { user } = useContext(Context);
  useEffect(() => {
    favouriteProd
      ? user.setFavoriteProd(product)
      : user.removeFavoriteProd(product);
  }, [favouriteProd]);
  return (
    <button
      className="product-image-icon-btn me-3 mt-auto px-1"
      
      onClick={(e) => setFavouriteProd(!favouriteProd)}
    >
      {favouriteProd ? (
        <i className="fas fa-heart"></i>
      ) : (
        <i className="far fa-heart"></i>
      )}
    </button>
  );
};

export default LikeProduct;
