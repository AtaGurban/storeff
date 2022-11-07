import { observer } from "mobx-react-lite";
import { useRef, React, useState } from "react";
import { Button } from "react-bootstrap";
import ProductItemShop from "./ProductItemShop";

const SlideProduct = observer(({ title, products }) => {
  const [sliderTranslate, setSliderTranslate] = useState(0);
  const [sliderRightBtn, setSliderRightBtn] = useState(true);
  const slider = useRef(null);
  const sliderWrapper = useRef(null);
  let width = 0;
  let k = 400;

  const rightSlide = () => {
    width =
      slider.current.clientWidth -
      sliderWrapper.current.clientWidth +
      sliderTranslate;
    if (width < k) {
      !sliderRightBtn ? slideBtnCompare() : slideBtnCompare2();
    } else {
      setSliderTranslate(() => sliderTranslate - k);
    }
  };

  const slideBtnCompare = () => {
    setSliderTranslate(0);
    setSliderRightBtn(true);
  };
  const slideBtnCompare2 = () => {
    setSliderTranslate(() => sliderTranslate - (width + 150));
    setSliderRightBtn(false);
  };

  return (
    <div className="slide-product ">
      <section className="my-4">
        <div className="container-fluid ">
          <div
            ref={sliderWrapper}
            className="slide-product-wrapper bg-white px-2 py-5 px-md-4 py-md-3 rounded position-relative"
          >
            <div className="d-flex mb-3 align-items-baseline border-bottom">
              <h3 className="h5 fw-700 mb-0">
                <span className="border-bottom slide-product-title border-width-2 pb-3 d-inline-block">
                  {title}
                </span>
              </h3>

            </div>

            <div className="product-slider position-relative">
              <div
                style={{ transform: `translateX(${sliderTranslate}px)` }}
                className="products d-flex"
                ref={slider}
              >
                {products.map(
                  (item) => (
                    <ProductItemShop product={item} key={item.id} />
                  )
                )}
              </div>
            </div>
            <div className="slick-right">
              <Button onClick={rightSlide} variant={"none"}>
                {">"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default SlideProduct;
