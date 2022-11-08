import { React, useContext, useState, useEffect } from "react";
import CarouselShop from "../components/CarouselShop";
import SlideProduct from "../components/SlideProduct";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

const Shop = observer(() => {
  const { banner, device, type } = useContext(Context);
  const [devices, setDevices] = useState(device.Devices[0]);
  const [newProducts, setNewProducts] = useState(device.NewProducts[0]);
  const banners = banner.Banners[0].filter((item) => {
    return item.name === "Banner";
  });
  let categoryNumbers = type.Category[0];

  const clickCategory = (id) => {
    let result = categoryNumbers.filter((item) => {
      return item.typeId === id;
    });
    return result[0].id;
  };

  const clickTitleTypeCategory = (id) => {
    let result = categoryNumbers.filter((item) => {
      return item.titleTypeId === id;
    });
    return result[0].id;
  };


  return (
    <div className="">
      <CarouselShop className="container-fluid" />
      {
        type.Types[0].map((i, index) =>
          <Accordion key={i.id} className="category-accordion">
            <Accordion.Item eventKey={index}>
              <Accordion.Header >
                <Link className="c-bold text-uppercase"
                  to={`/product/${clickCategory(i.id)}`}>{i.name}</Link>
              </Accordion.Header>
              {
                type.TitleTypes[0].filter((j) => j.typeId === i.id)
                  .map((k) =>
                    <Accordion.Body key={k.id}>
                      <Link
                        to={`/product/${clickTitleTypeCategory(i.id)}`}>{k.name}</Link>
                    </Accordion.Body>
                  )
              }
            </Accordion.Item>
          </Accordion>
        )
      }
      <SlideProduct title={"Saýlanan harytlar"} products={devices.rows} />
      <div className="banner container-fluid row my-3 mx-auto">
        {banners.map((item) => (
          <div key={item.id} className="slide-bottom-banner col-md-4 col-12">
            <a href="#" className="banner-link">
              <img
                src={`${process.env.REACT_APP_API_URL}/${item.img}`}
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
