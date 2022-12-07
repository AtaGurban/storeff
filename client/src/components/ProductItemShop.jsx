import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { React, useState, useContext, useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "..";
import { createBasketDevice } from "../http/basketAPI";

const ProductItemShop = observer(({ product }) => {
  const { user } = useContext(Context);
  const [basketProd, setBasketProd] = useState(false);
  const [clickBasket, setClickBasket] = useState(basketProd);
  const [favouriteProd, setFavouriteProd] = useState(false);

  useEffect(() => {
    favouriteProd
      ? user.setFavoriteProd(product)
      : user.removeFavoriteProd(product);
  }, [favouriteProd]);

  const clickBasketPush = () => {
    if (!clickBasket) {
      user.setBasketProd(product);
    }

    if (user.user.id) {
      let prodPrice = product.price
      const formData = new FormData();
      formData.append("userId", user.user.id);
      formData.append("deviceId", product.id);
      formData.append("prodPrice", prodPrice);
      createBasketDevice(formData);
    }
    setClickBasket(true);
  };

  useEffect(() => {
    toJS(user.basketProd).map((i) => {
      if (i.id === product.id) {
        setBasketProd(true);
      }
    });
  }, [toJS(user.basketProd)]);

  return (
    <div>
      <div className="product-item mx-2 py-2">
        <Card className="product-card">
          <div className="position-relative product-image mx-auto">
            <Link to={`/product/detail/${product.id}`}>
              <Image
                className=""
                src={`${process.env.REACT_APP_API_URL}${product.deviceImg[0]?.name}`}
              />
            </Link>
            <div className="product-image-icon">
              <button
                className="product-image-icon-btn px-1"
                href=""
                onClick={(e) => setFavouriteProd(!favouriteProd)}
              >
                {favouriteProd ? (
                  <i className="fas fa-heart"></i>
                ) : (
                  <i className="far fa-heart"></i>
                )}
              </button>
            </div>
            {/* <LikeProduct/> */}
          </div>

          <div className="product-info px-2 pb-2">
            <div className="product-desc my-2">
              <Link
                to={`/product/detail/${product.id}`}
                className="product-rate"
              >
                <div>
                  {product.rating >= 1 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                  {product.rating >= 2 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                  {product.rating >= 3 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                  {product.rating >= 4 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                  {product.rating >= 5 ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                </div>
              </Link>
            </div>
            <div className="product-title mb-2 ">
              <Link to={`/product/detail/${product.id}`}>
                <h5>{product.name}</h5>
              </Link>
            </div>

            <div className="product-price row mb-1 mx-auto">
              {basketProd ? (
                <button disabled className="btn btn-danger p-1">
                  {/* <i className="fas fa-shopping-basket"></i> */}
                  Sebetde
                </button>
              ) : (
                <button
                  onClick={(e) => clickBasketPush()}
                  className="btn btn-danger p-1"
                >
                  {/* <i className="fas fa-shopping-basket"></i> */}
                  Sebede goş
                </button>
              )}

              <p className="">{product.price} TMT</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
});

export default ProductItemShop;
