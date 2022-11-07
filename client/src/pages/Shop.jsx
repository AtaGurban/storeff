import { React, useContext, useState, useEffect } from "react";
import CarouselShop from "../components/CarouselShop";
import SlideProduct from "../components/SlideProduct";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const Shop = observer(() => {
  const { banner, device } = useContext(Context);
  const [devices, setDevices] = useState(device.Devices[0]);
  const [newProducts, setNewProducts] = useState(device.NewProducts[0]);
  const banners = banner.Banners[0].filter((item) => {
    return item.name === "Banner";
  });

  return (
    <div className="">
      <CarouselShop className="container-fluid" />
      <SlideProduct title={"Saýlanan harytlar"} products={devices.rows} />
      <div className="banner container-fluid row my-3 mx-auto">
        {banners.map((item) => (
          <div key={item.id} className="slide-bottom-banner col-4">
            <a href="#" className="banner-link">
              <img
                src={`${process.env.REACT_APP_API_URL}:5000/${item.img}`}
                alt={item.name}
              />
            </a>
          </div>
        ))}
      </div>
      <SlideProduct title={"Täze harytlar"} products={newProducts.rows} />

      {/* <div className="home-help container">
        <a href="#">
          <i className="fas fa-question-circle"></i>
          Sargyt nädip etmeli?
        </a>
      </div> */}
    </div>
  );
});

export default Shop;
