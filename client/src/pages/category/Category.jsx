import React, { useEffect, useState, useContext, useRef } from "react";
import { fetchDevices, fetchSearchDevices } from "../../http/deviceAPI";
import ProductItemSearch from "../../components/ProductItemSearch";
import "./category.css";
import { useParams } from "react-router-dom";
import { Accordion, Card, Image, Spinner, Pagination } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const Category = observer(() => {
  const params = useParams();
  const [queryProduct, setQueryProduct] = useState([]);
  const [productCountPage, setProductCountPage] = useState(0);
  const [firstFilterBool, setFirstFilterBool] = useState(false);
  const [paginationBool, setPaginationBool] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reqTitle, setReqTitle] = useState("");
  const [reqValue, setReqValue] = useState("");
  const [page, setPage] = useState(1);
  const [priceFilteer, setPriceFilteer] = useState([0, 10000000]);
  // const [filteerBrand, setFilteerBrand] = useState([]);
  const [deviceInfoState, setDeviceInfoState] = useState([]);
  const [deviceInfoTitle, setDeviceInfoTitle] = useState([]);
  const [deviceInfoDescription, setDeviceInfoDescription] = useState({});
  const [productSort, setProductSort] = useState(true);
  const [applyFilteerState, setApplyFilteerState] = useState("");
  const {  type } = useContext(Context);
  // const lastElement = useRef();
  // const observer = useRef();
  const [applyFilteerBtn, setApplyFilteerBtn] = useState(
    "apply-filters-float-btn"
  );

  let categoryNumbers = type.Category[0];
  // useEffect(() => {
  //   if (queryProduct) {
  //     productSortFunc(productSort);
  //   }
  // }, [queryProduct, productSort]);

  const firstFetchDevices = async () => {
    if (reqTitle && reqValue) {
      setLoading(true)
      console.log('first');
      await fetchDevices(`?page=${page}&${reqTitle}=${reqValue}&sort=${productSort}&minPrice=${priceFilteer[0]}&maxPrice=${priceFilteer[1]}`)
        .then((data) => {
          setQueryProduct([...data.rows]);
          setProductCountPage(data.count);
          setDeviceInfoDescription(data.deviceInfoDescription);
          setDeviceInfoTitle(data.deviceInfoTitle);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(()=>{
    setFirstFilterBool(true)
  }, [deviceInfoState])


  // const paginationFetchDevices = async () => {
  //   if (reqTitle && reqValue) {
  //     console.log("pagination");
  //     await fetchDevices(`?page=${page}&${reqTitle}=${reqValue}`)
  //       .then((data) => {
  //         setQueryProduct([...queryProduct, ...data.rows]);
  //         setProductCountPage(data.count.length);
  //       })
  //       .finally(() => setLoading(false));
  //   }
  // };

  let paginationLimit = 5;
  let items = [];
  for (let number = 1; number <= Math.ceil(productCountPage / paginationLimit); number++) {
    items.push(
      <Pagination.Item
        onClick={(e) => setPage(number)}
        key={number}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }

  const createQueryFetchAndFetchDevices = async () => {
    if (params.id.includes("query=")) {
      setLoading(true)
      console.log('search');
      await fetchSearchDevices(`${params.id.slice(6)}&page=${page}&sort=${productSort}`)
        .then((data) => {
          setQueryProduct(data.rows);
          setProductCountPage(data.count);
          setDeviceInfoDescription(data.deviceInfoDescription);
          setDeviceInfoTitle(data.deviceInfoTitle);
        })
        .finally(() => setLoading(false));
    } else {
      let currentCategory = categoryNumbers.filter((i) => {
        return i.id == params.id;
      })[0];
      for (let key in currentCategory) {
        if (currentCategory[key]) {
          setReqTitle(key);
          setReqValue(currentCategory[key]);
        }
      }
      firstFetchDevices();
    }
  };

  // console.log(queryProduct);

  useEffect(() => {
    setQueryProduct([]);
    setPage(1);
    firstFetchDevices();
  }, [reqTitle, reqValue]);
  useEffect(async () => {
    setLoading(false);
    setPage(1);
    setQueryProduct([]);
    await createQueryFetchAndFetchDevices();
  }, [params]);

  useEffect(async () => {
    await startFilteer();
  }, [page]);

  // useEffect(async () => {
  //   startFilteer();
  // }, [filteerBrand]);

  // useEffect(() => {
  //   if (queryProduct?.length > 0) {
  //     setDeviceInfoTitle([]);
  //     setDeviceInfoDescription([]);
  //     let arrTitle = [];
  //     let arrDescription = [];
  //     queryProduct?.map((i) => {
  //       i.more_info?.map((j) => {
  //         let newElem = { id: j.id, title: j.title };
  //         const bool =
  //           arrTitle.filter((obj) => {
  //             return (
  //               obj?.title?.trim().toLowerCase() ===
  //               j?.title?.trim().toLowerCase()
  //             );
  //           }).length === 0;
  //         if (bool) {
  //           arrTitle.push(newElem);
  //           setDeviceInfoTitle((deviceInfoTitle) => [
  //             ...deviceInfoTitle,
  //             newElem,
  //           ]);
  //         }
  //       });
  //     });
  //     queryProduct?.map((i) => {
  //       i.more_info?.map((j) => {
  //         let newElem = {
  //           id: j.id,
  //           title: j.title,
  //           description: j.description,
  //         };
  //         const bool =
  //           arrDescription.filter((obj) => {
  //             return (
  //               obj?.description?.toLowerCase().trim() ===
  //               j?.description?.toLowerCase().trim()
  //             );
  //           }).length === 0;
  //         if (bool) {
  //           arrDescription.push(newElem);
  //           setDeviceInfoDescription((deviceInfoDescription) => [
  //             ...deviceInfoDescription,
  //             newElem,
  //           ]);
  //         }
  //       });
  //     });
  //   } else {
  //     setDeviceInfoTitle([]);
  //     setDeviceInfoDescription([]);
  //   }
  // }, [queryProduct]);

  const bodyFilteerFunc = (bodyTitle, bodyValue) => {
    const bool =
      deviceInfoState.filter((i) => {
        return (
          i.title === bodyTitle.title && i.description === bodyValue.description
        );
      }).length === 0;
    bool
      ? setDeviceInfoState((deviceInfoState) => [
          ...deviceInfoState,
          {
            id: Date.now(),
            title: bodyTitle.title,
            description: bodyValue.description,
          },
        ])
      : setDeviceInfoState((deviceInfoState) =>
          deviceInfoState.filter(
            (item) =>
              item.title != bodyTitle.title ||
              item.description != bodyValue.description
          )
        );
    applyFilteer(bodyValue.description);
  };

  const startFilteer = async () => {
    if (deviceInfoState.length > 0 || ((priceFilteer[0] != 0) || (priceFilteer[1] < 10000000))) {
      let queryRequest = `?${reqTitle}=${reqValue}&`
        // filteerBrand.length === 0
        //   ? `?${reqTitle}=${reqValue}&`
        //   : `?${reqTitle}=${reqValue}&brandId=${filteerBrand.join("%")}&`;
      let infoFilteer = {};
      deviceInfoState.map((i) => {
        infoFilteer[i.title] = [];
      });
      deviceInfoState.map((i) => {
        infoFilteer[i.title].push(i.description);
      });
      let result = "";
      for (const key in infoFilteer) {
        result = result + `filter_${key}=${infoFilteer[key].join("%")}&`;
      }
      const queryBody = encodeURI(result);
      queryRequest = queryRequest + queryBody;

      queryRequest =
        queryRequest +
        `minPrice=${priceFilteer[0]}&maxPrice=${priceFilteer[1]}&page=${page}&sort=${productSort}`;
        
        console.log(firstFilterBool);
      if (firstFilterBool){
        setPage(1);
        setFirstFilterBool(false)
      }
      await fetchDevices(queryRequest).then((data) => {
        setQueryProduct(data.rows);
        setProductCountPage(data.count);
        setDeviceInfoDescription(data.deviceInfoDescription);
        setDeviceInfoTitle(data.deviceInfoTitle);
      });
    } else {
      firstFetchDevices();
    }
  };

  const priceFilteerFunc = (node, value) => {
    setPriceFilteer((priceFilteer) => (priceFilteer = value));
    applyFilteer(node);
  };
  const elem = (
    <div
      onClick={() => {startFilteer(); setApplyFilteerBtn((applyFilteerBtn) => applyFilteerBtn + "d-none");}}
      className={applyFilteerBtn}
      data-label="Gözle"
    ></div>
  );
  const applyFilteer = (node) => {
    setApplyFilteerState(node?.id ? node.id : node);
    setApplyFilteerBtn("apply-filters-float-btn");
    setTimeout(() => {
      setApplyFilteerBtn((applyFilteerBtn) => applyFilteerBtn + "d-none");
    }, 3000);
  };

  // const productSortFunc = (value) => {
  //   if (value != "null") {
  //     setProductSort(value);
  //     if (sortActive) {
  //       productSort === "arzan"
  //         ? setSortedProduct(
  //             [...queryProduct].sort((a, b) => a.price - b.price)
  //           )
  //         : setSortedProduct(
  //             [...queryProduct].sort((a, b) => b.price - a.price)
  //           );
  //     } else {
  //       productSort === "arzan"
  //         ? setSortedProduct([...queryProduct])
  //         : setSortedProduct([...queryProduct]);
  //     }
  //   }
  // };

  useEffect(() => {
    if (Math.ceil(productCountPage / 10) >= page + 1) {
      setPaginationBool(true);
    }
  }, [productCountPage]);

  useEffect(()=>{
    firstFetchDevices()
  }, [productSort])

  // useEffect(() => {
  //   if (!loading) {
  //     var callback = function (entries, observer) {
  //       if (entries[0].isIntersecting && paginationBool) {
  //         setPage(page + 1);
  //         setPaginationBool(false);
  //       }
  //     };
  //     observer.current = new IntersectionObserver(callback);
  //     observer.current.observe(lastElement.current);
  //   }
  // }, [ productCountPage]);

  // const pushArrayBrand = (value, id) => {
  //   value.classList.toggle("active-check");
  //   let boolIndex = value.classList.contains("active-check");
  //   if (!boolIndex) {
  //     setFilteerBrand(() => {
  //       return filteerBrand.filter((item) => {
  //         return item !== id;
  //       });
  //     });
  //   } else setFilteerBrand([...filteerBrand, id]);
  // };

  if (loading) {
    return (
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
        className="d-flex"
      >
        <Spinner animation={"grow"} />
      </div>
    );
  }

  return (
    <div className="container-fluid container-lg mx-lg-auto row mt-5">
      <div className="col-lg-3  px-3 py-3 mt-5 product-feelteer">
        {/* <h4>Filtirle</h4> */}
        <div className="position-relative">
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Baha</Accordion.Header>
              <Accordion.Body>
                {applyFilteerState === "input-one" ? elem : null}
                <p className="mb-2">
                  <input
                    className="me-3 form-check-input"
                    id="input-one"
                    type="radio"
                    name="product-price"
                    value={[0, 100000]}
                    onChange={(e) => priceFilteerFunc(e.target, [0, 100000])}
                  />
                  Hemmesi
                </p>
                {applyFilteerState === "input-two" ? elem : null}
                <p className="mb-2">
                  <input
                    className="me-3 form-check-input"
                    id="input-two"
                    type="radio"
                    name="product-price"
                    value={[0, 1000]}
                    onChange={(e) => priceFilteerFunc(e.target, [0, 1000])}
                  />
                  0 tmt - 1000 tmt
                </p>
                {applyFilteerState === "input-three" ? elem : null}
                <p className="mb-2">
                  <input
                    className="me-3 form-check-input"
                    id="input-three"
                    type="radio"
                    name="product-price"
                    value={[1000, 5000]}
                    onChange={(e) => priceFilteerFunc(e.target, [1000, 5000])}
                  />
                  1000 tmt - 5000 tmt
                </p>
                {applyFilteerState === "input-four" ? elem : null}
                <p className="mb-2">
                  <input
                    className="me-3 form-check-input"
                    id="input-four"
                    type="radio"
                    name="product-price"
                    value={[5000, 10000]}
                    onChange={(e) => priceFilteerFunc(e.target, [5000, 10000])}
                  />
                  5000 tmt - 10000 tmt
                </p>
                {applyFilteerState === "input-five" ? elem : null}
                <p className="mb-2">
                  <input
                    className="me-3 form-check-input"
                    id="input-five"
                    type="radio"
                    name="product-price"
                    value={[10000, 20000]}
                    onChange={(e) => priceFilteerFunc(e.target, [10000, 20000])}
                  />
                  10000 tmt - 20000 tmt
                </p>
                {applyFilteerState === "input-six" ? elem : null}
                <p className="mb-2">
                  <input
                    className="me-3 form-check-input"
                    id="input-six"
                    type="radio"
                    name="product-price"
                    value={[20000, 100000]}
                    onChange={(e) =>
                      priceFilteerFunc(e.target, [20000, 100000])
                    }
                  />
                  20000 tmt - 100000 tmt
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/* <Accordion className="mt-1" defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Brendler</Accordion.Header>
              <Accordion.Body>
                {brand.Brands.map((brand) => (
                  <p key={brand.id} className="mb-2">
                    <input
                      className="me-3 form-check-input"
                      type="checkbox"
                      name="product-price"
                      value={brand.name}
                      onChange={(e) => pushArrayBrand(e.target)}
                    />
                    {brand.name}
                  </p>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion> */}
          {deviceInfoTitle.map((i) => (
            <Accordion
              key={i.id}
              className="mt-1"
              defaultActiveKey={["0"]}
              alwaysOpen
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>{i.title}</Accordion.Header>
                <Accordion.Body>
                  {deviceInfoDescription
                    .filter((d) => d.title === i.title)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .map((item) => (
                      <div key={item.id} className="mb-2">
                        {applyFilteerState === item.description ? elem : null}
                        <input
                          className="me-3 form-check-input"
                          type="checkbox"
                          // checked={filterReset ? false : undefined}
                          name={item.description}
                          value={item.description}
                          onChange={(e) => bodyFilteerFunc(i, item)}
                        />
                        {item.description}
                      </div>
                    ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
          <div className="mt-3 d-block text-center">
            <button
              onClick={() => startFilteer()}
              className="btn filter-btn mx-3"
            >
              Gözle
            </button>
            {/* <button
              onClick={() => {
                setFilterReset(true);
                setDeviceInfoState([]);
                // setFilterReset(false)
              }}
              className="btn btn-primary w-25 mx-3"
            >
              Poz
            </button> */}
          </div>
        </div>
      </div>
      <div className="col-lg-9 col-12">
        {/* <div className="d-block" style={{textAlign: 'center'}}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          maxLength="25"
          className="category-search "
          type="text"
          placeholder="Gozleg..."
        /></div>   */}
        {/* <div className="row">
          {brand.Brands[0].map((brand) => (
            <Card
              style={{ height: 50 }}
              key={brand.id}
              className="m-2 col-2"
              border={filteerBrand.includes(brand.id) ? "danger" : "light"}
            >
              <Image
                onClick={(e) => pushArrayBrand(e.target, brand.id)}
                alt={brand.name}
                className="p-1"
                width={"100%"}
                height="100%"
                src={`${process.env.REACT_APP_API_URL}:5000/${brand.img}`}
              />
            </Card>
          ))}
        </div>

        <hr /> */}
        <div className="product-sort mb-3">
          <select
            onChange={(e) => {
              setPage(1)
              setProductSort(e.target.value)
            }}
            className="form-select"
            aria-label="Default select example"
          >
            <option disabled value={"null"}>
              Tertipleme
            </option>
            <option value={true}>Arzandan gymmada</option>
            <option value={false}>Gymmatdan arzana</option>
          </select>
        </div>
        <div className="d-flex category-products">
          {queryProduct.map((item) => (
            <ProductItemSearch product={item} key={item.id} />
          ))}
          <div className="mt-3">
            <Pagination style={{ justifyContent: "center" }}>
              {items}
            </Pagination>
          </div>
          {/* <div ref={lastElement} className="pagination-block"></div> */}
        </div>
      </div>
    </div>
  );
});

export default Category;
