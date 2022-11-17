import { React, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "..";
import LikeProduct from "./LikeProduct";
import { Card } from "react-bootstrap";
import { createBasketDevice } from "../http/basketAPI";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const ProductItemSearch = observer(({ product }) => {
  const { user } = useContext(Context);

  const [currentSubDevice, setCurrentSubDevice] = useState(
    product?.subDevice[0]
  );
  const [basketProd, setBasketProd] = useState(false);
  const [clickBasket, setClickBasket] = useState(basketProd);

  const clickBasketPush = () => {
    let prodPrice =
      currentSubDevice !== undefined ? currentSubDevice.price : product?.price;

    let clone = {}
    Object.assign(clone, product, {price: prodPrice})
    if (!clickBasket) {
      user.setBasketProd(clone);
    }

    if (user.user.id) {
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
    <div className="product-item-search mb-3">
      <div className="product-card-search justify-content-center row position-relative bg-white flex-wrap">
        <div className="product-image-icon-search"></div>
        <div className=" product-image-search p-1 col-12 col-md-3">
          <img
            src={`${process.env.REACT_APP_API_URL}${product.deviceImg[0].name}`}
          />
        </div>

        <div className="product-info p-3 col-9">
          <div className="product-name my-2">
            <Link to={`/product/detail/${product.id}`}>
              <h4 className="text-uppercase c-bold">{product.name}</h4>
            </Link>
          </div>
          <div className="row">
            {product?.subDevice.map((item) => (
              <Card
                key={item.id}
                onClick={(e) => setCurrentSubDevice(item)}
                border={item.id === currentSubDevice.id ? "danger" : "light"}
                className="col-5 col-md-3 mx-2 p-2"
              >
                {item?.info.map((i) => (
                  <div key={i.id} className="c-bold">
                    {i.title}: {i.description}
                  </div>
                ))}
              </Card>
            ))}
          </div>
          <div className="product-rate-price align-items-center d-flex my-1 mt-3">
            <div className="product-rate-com mt-5 d-flex col-6">
              <div href="#" className="product-rate-search me-3">
                <div className="">
                  {/* <div className=""> */}
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
                  {/* </div> */}
                  <span className="ms-2">
                    ({product?.rating?.length})
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex col-sm-6 col-6">
              <LikeProduct product={product} />
              <div className="product-price-search ">
                <p>
                  {currentSubDevice !== undefined
                    ? currentSubDevice.price
                    : product?.price}{" "}
                  TMT
                </p>
                {basketProd ? (
                  <button disabled className="btn btn-danger  p-1">
                    <i className="fas fa-shopping-basket me-2"></i>
                    <span className="btn-span">Sebetde</span> 
                  </button>
                ) : (
                  <button
                    onClick={(e) => clickBasketPush()}
                    className="btn btn-danger  p-1"
                  >
                    <i className="fas fa-shopping-basket me-2"></i>
                    <span className="btn-span">Sebede goş</span> 
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductItemSearch;
