import React, { useState, useContext, useEffect } from "react";
import { BASKET_ROUTE, FAVOURITE_ROUTE, SHOP_ROUTE } from "../utils/pathConsts";
import { Link } from "react-router-dom";
import ModalNav from "./ModalNav";
import ModalAuth from "./ModalAuth";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { fetchOneDevice, fetchSearchDevices } from "../http/deviceAPI";
import { fetchBasketDevices } from "../http/basketAPI";
import { toJS } from "mobx";
import SearchProduct from "./SearchProduct";

const NavBar = observer(() => {
  const [link, setLink] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(true);
  const [modalAuth, setModalAuth] = useState(false);
  let modalNavBool = null;
  let mouseOut = null;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProduct, setSearchProduct] = useState([]);
  const [inputVvod, setInputVvod] = useState(false);
  const [menuChangeNum, setMenuChangeNum] = useState(0);
  const [searchPanelVisible, setSearchPanelVisible] = useState(false);
  const [subMenuClass, setSubMenuClass] = useState(
    "py-3 submenu d-flex col-9 position d-none"
  );
  const [classMegaMenu, setClassMegaMenu] = useState(
    "mega-menu-category-wrapper d-none"
  );
  const [visibleMegaMenu, setVisibleMegaMenu] = useState(false);
  const { user, type } = useContext(Context);
  let boolMouse1 = false;

  useEffect(() => {
    menuChangeNum === 0
      ? setSubMenuClass("py-3 submenu d-flex col-9 position d-none")
      : setSubMenuClass("py-3 submenu d-flex col-9 position");
  }, [menuChangeNum]);

  useEffect(() => {
    if (searchProduct?.length > 0) setSearchPanelVisible(true);
  }, [searchProduct]);

  useEffect(async () => {
    if (toJS(user.user)) {
      let arr = [];
      await fetchBasketDevices(`?userId=${user.user.id}`).then(
        (data) => (arr = data)
      );
      arr.forEach(async (i) => {
        await fetchOneDevice(i.deviceId).then((data) => {
          data.price = i.productPrice;
          user.setBasketProd(data);
        });
      });
    }
  }, [toJS(user.isAuth)]);

  const showLink = () => {
    if (!modalNavBool) {
      setModalVisible(true);
    } else setModalVisible(false);
  };

  let categoryItems = [...type?.Types[0]];
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

  const clickSubTypeCategory = (id) => {
    let result = categoryNumbers.filter((item) => {
      return item.subTypeId === id;
    });
    return result[0].id;
  };

  const showModalAuth = () => {
    setModalAuth(!modalAuth);
  };

  const searchQueryFunc = (value) => {
    setSearchQuery(value);
    setInputVvod(false);
    setTimeout(() => {
      setInputVvod(true);
    }, 400);
  };

  const megaMenuVisibleFunc = () => {
    setVisibleMegaMenu((visibleMegaMenu) => !visibleMegaMenu);
  };

  useEffect(() => {
    if (visibleMegaMenu) {
      setClassMegaMenu("mega-menu-category-wrapper");
    } else {
      setClassMegaMenu("mega-menu-category-wrapper d-none");
      setMenuChangeNum(0);
    }
  }, [visibleMegaMenu]);

  useEffect(async () => {
    if (inputVvod && searchQuery != "") {
      await fetchSearchDevices(searchQuery).then((data) =>
        setSearchProduct(data?.rows)
      );
    }
  }, [inputVvod]);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchPanelVisible(false);
    }
  }, [searchQuery]);

  return (
    <div className="header bg-white">
      <div className="row container-lg navUser d-flex pb-1 pt-4 ">
        <div className="logo col-1">
          <Link to={SHOP_ROUTE}>AtaGurban</Link>{" "}
        </div>
        <div className="col-1 category-btn">
          <div onClick={() => megaMenuVisibleFunc()} className="btn btn-danger">
            Kategoriýalar
          </div>
          <div
            onClick={() => setVisibleMegaMenu(false)}
            style={
              menuChangeNum === 0
                ? { backgroundColor: "transparent" }
                : { backgroundColor: "rgba(0, 0, 0, 0.616)" }
            }
            className={classMegaMenu}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="container d-flex"
            >
              <div className="menu col-3">
                {type.Types[0].map((i) => (
                  <div
                    key={i.id}
                    className="my-3 text-center p-2 mega-menu-item"
                    onMouseOver={() => setMenuChangeNum(i.id)}
                  >
                    <Link
                      className="c-bold text-uppercase"
                      to={`product/${clickCategory(i.id)}`}
                      onClick={() => setVisibleMegaMenu(false)}
                    >
                      {i.name}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="petlya "></div>
              <div className={subMenuClass}>
                <div className="submenu-text col-8 d-flex">
                  {menuChangeNum !== 0
                    ? type.TitleTypes[0]
                        .filter((j) => j.typeId === menuChangeNum)
                        .map((i) => (
                          <div
                            key={i.id}
                            className="mb-2 text-center p-2 mega-menu-item col-3 "
                          >
                            <Link
                              to={`product/${clickTitleTypeCategory(i.id)}`}
                              className="c-bold"
                              onClick={() => setVisibleMegaMenu(false)}
                            >
                              {i.name}
                            </Link>
                            <ul className="mega-menu-subtypes">
                              {type.SubTypes[0]
                                .filter(
                                  (subType) => subType.titleTypeId === i.id
                                )
                                .map((filterSubType) => (
                                  <li key={filterSubType.id}>
                                    <Link
                                      onClick={() => setVisibleMegaMenu(false)}
                                      to={`product/${clickSubTypeCategory(
                                        filterSubType.id
                                      )}`}
                                    >
                                      {filterSubType.name}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))
                    : null}
                </div>
                <div className="mega-menu-image flex-column col-4 d-flex m-auto pe-3">
                  {type.Types[0]
                    .filter((i) => i.id === menuChangeNum)
                    .map((j) => (
                      <img src={`${process.env.REACT_APP_API_URL}:5000/${j.imgOne}`} alt="" />
                    ))}
                  {type.Types[0]
                    .filter((i) => i.id === menuChangeNum)
                    .map((j) => (
                      <img src={`${process.env.REACT_APP_API_URL}:5000/${j.imgTwo}`} alt="" />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-md-4 ps-5 search ">
          <input
            type="text"
            placeholder="Islän harydyňyzy gözläň"
            onChange={(e) => searchQueryFunc(e.target.value)}
            value={searchQuery}
          />
          <Link
            to={`product/query=${searchQuery}`}
            onClick={() => setSearchPanelVisible(false)}
          >
            <i className="fas fa-search search-icon nav-icon"></i>
          </Link>
          <div className="search-panel-wrapper position-relative">
            <div
              style={
                searchPanelVisible ? { display: "block" } : { display: "none" }
              }
              className="search-panel position-absolute"
            >
              {searchProduct?.map((i) => (
                <SearchProduct
                  setSearchQuery={setSearchQuery}
                  setSearchPanelVisible={setSearchPanelVisible}
                  key={i.id}
                  name={i.name}
                  img={i.deviceImg[0].name}
                  id={i.id}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="nav-links d-flex col-md-4 col-xl-3">
          <div>
            <div
              onClick={showModalAuth}
              onMouseOut={(e) => (boolMouse1 = true)}
              className="nav-linkk auth"
            >
              <i className="fas fa-user d-block nav-icon"></i>
              {user.isAuth ? (
                <span className="c-bold">{user.user.name}</span>
              ) : (
                <span>Girish</span>
              )}

              <ModalAuth modalAuth={modalAuth} setModalAuth={setModalAuth} />
            </div>
          </div>

          <Link
            to={FAVOURITE_ROUTE}
            className="nav-linkk d-block nav-link-basket"
          >
            <i className="fas fa-heart d-block nav-icon"></i>
            <span>Halanlarym</span>
            <span className="count-product count-product-right">
              {user.favoriteProd.length}
            </span>
            {/* <ModalProd/> */}
          </Link>
          <Link to={BASKET_ROUTE} className="nav-linkk nav-link-basket d-block">
            <i className="fas fa-shopping-basket d-block nav-icon"></i>
            <span>Sebedim</span>
            <span className="count-product">{user?.basketProd?.length}</span>
          </Link>
        </div>
        <div
          style={{ height: 20 }}
          className="line-block position-absolute"
          onMouseOut={(e) => setModalVisible(false)}
        ></div>
        <div
          className={
            !visibleMegaMenu ? "bottom-links d-flex" : "bottom-links d-none"
          }
          // style={menuChangeNum === 0 ? {display: 'flex'} : {display: 'none'}}
        >
          {categoryItems.map((item) => (
            <Link
              key={item.id}
              onMouseOver={(e) => {
                // setModalVisible(true);
                // setModalContent(true);
                modalNavBool = false;
                setLink(item.id);
                showLink();
              }}
              onMouseOut={() => {
                modalNavBool = true;
              }}
              onClick={() => setModalVisible(false)}
              className={
                link === item.id && modalVisible
                  ? "bottom-link active-link"
                  : "bottom-link"
              }
              to={`product/${clickCategory(item.id)}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <ModalNav
          children={link}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalContent={modalContent}
          setModalContent={setModalContent}
        />
      </div>
    </div>
  );
});

export default NavBar;
