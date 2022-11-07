import { React, useState } from "react";
import LikeProduct from "./LikeProduct";

const ProductImgGroup = ({ product }) => {
  let photo = product ? product[0] : null;
  const [productImg, setProductImg] = useState(photo.name);

  const littleImageFunc = (image) => {
    setProductImg(image);
  };


  return (
    <div className="position-relative">
      <div className="position-absolute like-product-page text-center">
        <LikeProduct />
        {/* <span>Halanlaryma goş</span> */}
      </div>
      <div className="mb-1 p-2 big-img">
        <img
          width="100%"
          src={`${process.env.REACT_APP_API_URL}:5000/${productImg}`}
        />
      </div>
      <div className="img-little-group d-flex align-items-center justify-content-center">
        {product?.map((item, index) => (
          <div
            className="ms-1 little-image"
            style={{ width: "15%", height: "50px" }}
            key={index}
          >
            <img
              onMouseOver={(e) => littleImageFunc(item.name)}
              src={`${process.env.REACT_APP_API_URL}:5000/${item.name}`}
              alt={product.name}
              style={
                productImg == item.name ? { borderBottom: "2px solid red" } : {}
              }
              className="p-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImgGroup;
