import { React, useContext, useEffect, useState } from "react";
import LikeProduct from "./LikeProduct";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import ProductCount from "../components/ProductCount";
import { Link } from "react-router-dom";

const ProductItemBasket = observer(({ product, pushSumm }) => {
  const { user } = useContext(Context);
  const [productCount, setProductCount] = useState(1);
  const [oldProductCount, setOldProductCount] = useState(0);

  const countFunc = (count) => {
    setProductCount(() => count);
    // setCountBool(bool)
  };



  useEffect(() => {
    pushSumm(productCount, oldProductCount, product.price);
    setOldProductCount(productCount);
  }, [productCount]);

  const removeBasketProduct = () => {
    user.removeBasketProd(product);
    pushSumm(0, oldProductCount, product.price);
  };

  const productDesc = (obj) => {
    let arr = [];
    for (let key in obj) {
      arr.push(key, obj[key]);
    }
    return arr.join(" ");
  };

  return (
    <div className="product-item-basket mb-1">
      <div className="product-basket-content row">
        <div className="col-3 text-center">
          <img
            src={`${process.env.REACT_APP_API_URL}:5000/${product.deviceImg[0].name}`}
            alt=""
            className="product-basket-img"
          />
        </div>
        <div className="col-9 d-flex flex-column">
          <Link to={`/product/detail/${product.id}`}>
            <p className="c-bold product-basket-info ">{product.name}</p>
          </Link>

          <p className="">{productDesc(product.body)}</p>
          <div className="d-flex product-basket-info-btn mt-auto justify-content-between align-items-end">
            <div className="col-5  d-flex align-items-center">
              <div className="">
                <LikeProduct product={product} />
              </div>
              <div onClick={removeBasketProduct} className="ms-3 basket-remove">
                <i className="fas fa-trash-alt me-2"></i> Aýyr
              </div>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <span className="basket-price mt-auto">
                {product.price * productCount} TMT
              </span>
              <div className="mx-3 col-4">
                <div className="c-bold mb-2" style={{ fontSize: "1rem" }}>
                  Harydyň sany
                </div>
                <ProductCount countFunc={countFunc} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
});

export default ProductItemBasket;
