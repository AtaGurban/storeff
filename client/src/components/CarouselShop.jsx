import { React, useContext } from "react";
import { Carousel } from "react-bootstrap";
import { Context } from "..";
const CarouselShop = () => {
  const { banner } = useContext(Context);

  const sliders = banner.Banners[0].filter((item) => {
    return item.name === "Slider";
  });

  return (
    <Carousel fade className="">
      {sliders.map((item) => (
        <Carousel.Item key={item.id}>
          <img
            // style={{ height: 400, }}
            className="d-block w-100"
            src={`${process.env.REACT_APP_API_URL}${item.img}`} 
            alt={item.name}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselShop;
