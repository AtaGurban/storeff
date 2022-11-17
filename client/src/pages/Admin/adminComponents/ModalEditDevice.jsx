import { React, useState, useContext, useEffect } from "react";
import { Button, Form, Modal, Dropdown } from "react-bootstrap";
import { updateDevice } from "../../../http/deviceAPI";
import DropType from "./DropType";
import { Context } from "../../..";

const ModalEditDevice = ({ currentEditDevice, show, onHide }) => {
  // const [boolBtn, setBoolBtn] = useState(true);
  // const { brand } = useContext(Context);
  const [bigDesc, setBigDesc] = useState("");
  const [littleDesc, setLittleDesc] = useState("");
  const [DeviceMoreInfo, setDeviceMoreInfo] = useState([]);
  const [device, setDevice] = useState("");
  const [price, setPrice] = useState(null);
  const [img, setImg] = useState(null);
  // const [dropBrand, setDropBrand] = useState({});
  const [typeId, setTypeId] = useState(null);
  const [titleTypeId, setTitleTypeId] = useState(null);
  // const [subTypeId, setSubTypeId] = useState(null);

  useEffect(() => {
    if (currentEditDevice.name) {
      setDevice(currentEditDevice.name);
      setPrice(currentEditDevice.price);
      setImg(currentEditDevice.deviceImg[0].name);
      setBigDesc(currentEditDevice.device_description[0].big);
      setLittleDesc(currentEditDevice.device_description[0].little);
      // setDropBrand(
      //   () =>
      //     brand.Brands[0].filter((i) => i.id === currentEditDevice.brandId)[0]
      // );
      setDeviceMoreInfo(currentEditDevice.more_info)
    }
  }, [currentEditDevice]);

  const selectFileOne = (e) => {
    setImg(e.target.files[0]);
  };
  const currentType = (obj) => {
    setTypeId(obj.typeId);
    setTitleTypeId(obj.titleTypeId);
    // setSubTypeId(obj.subTypeId);
    // if (subTypeId) {
    //   setBoolBtn(false);
    // }
  };

  const addMoreInfo = () => {
    setDeviceMoreInfo([
      ...DeviceMoreInfo,
      { title: "", description: "", number: Date.now() },
    ]);
  };

  const removeMoreInfo = (number) => {
    setDeviceMoreInfo(DeviceMoreInfo.filter((i) => i.number !== number));
  };

  const changeMoreInfo = (key, value, number) => {
    setDeviceMoreInfo(
      DeviceMoreInfo.map((i) =>
        i.number === number ? { ...i, [key]: value } : i
      )
    );
  };

  const updateDeviceFunc = () => {
    const formData = new FormData();
    formData.append("id", currentEditDevice.id);
    formData.append("name", device);
    formData.append("price", price);
    formData.append("img", img);
    formData.append("typeId", typeId);
    formData.append("titleTypeId", titleTypeId);
    // formData.append("subTypeId", subTypeId);
    // formData.append("brandId", dropBrand.id);
    updateDevice(formData).then((data) => {
      onHide();
      window.location.reload();
    });
  };

  return (
    <div>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Haryt goşmak
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-6">
                <Form.Control
                  className="my-3"
                  value={device}
                  onChange={(e) => setDevice(e.target.value)}
                  placeholder={"Harydyň ady"}
                />
              </div>
              <div className="col-6">
                <Form.Control
                  type="number"
                  className="my-3"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={"Harydyň minimal bahasy"}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <h4 className="text-center mb-2">
                  Harydyň kategoriýasyny görkeziň
                </h4>
                <DropType
                  currentEditDevice={currentEditDevice}
                  currentType={currentType}
                />
              </div>
              {/* <div className="col-6">
                <h4 className="text-center mb-2">Harydyň brendini görkeziň</h4>
                <div
                  style={{ flexDirection: "column", alignItems: "center" }}
                  className="d-flex"
                >
                  <Dropdown className="mb-3">
                    <Dropdown.Toggle>
                      {dropBrand.name || "Brendi saýlaň"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {brand.Brands[0].map((brand) => (
                        <Dropdown.Item
                          onClick={() => setDropBrand(brand)}
                          key={brand.id}
                        >
                          {brand.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div> */}
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <h4 className="text-center mb-2">
                  Harydyň kiçi beýanyny görkeziň
                </h4>
                <div class="input-group">
                  <textarea
                    style={{ height: "150px", maxHeight: "350px" }}
                    class="form-control"
                    onChange={(e) => setLittleDesc(e.target.value)}
                    value={littleDesc}
                    aria-label="With textarea"
                  ></textarea>
                </div>
              </div>
              <div className="col-6">
                <h4 className="text-center mb-2">
                  Harydyň uly beýanyny görkeziň
                </h4>
                <textarea
                  style={{ height: "150px", maxHeight: "350px" }}
                  class="form-control"
                  value={bigDesc}
                  onChange={(e) => setBigDesc(e.target.value)}
                  aria-label="With textarea"
                ></textarea>
              </div>
            </div>
            <hr />
            <div className="mt-3 c-bold">Harydyň suraty</div>

            <img src={`${process.env.REACT_APP_API_URL}:5000/${img}`} alt="" />
            <Form.Control
              className="my-3"
              type="file"
              onChange={selectFileOne}
            />
          </Form>
          <hr />
          <Button variant={"outline-dark"} onClick={addMoreInfo}>
            Goşmaça häsiýet goş
          </Button>
          {DeviceMoreInfo?.map((item) => (
            <div key={item.number} className="row mt-3">
              <div className="col-4">
                <Form.Control
                  value={item.title}
                  onChange={(e) =>
                    changeMoreInfo("title", e.target.value, item.number)
                  }
                  placeholder="Häsiýetiň ady"
                />
              </div>
              <div className="col-4">
                <Form.Control
                  value={item.description}
                  onChange={(e) =>
                    changeMoreInfo("description", e.target.value, item.number)
                  }
                  placeholder="Häsiýetiň beýany"
                />
              </div>
              <div className="col-4">
                <Button
                  onClick={() => removeMoreInfo(item.number)}
                  variant={"danger"}
                >
                  Poz
                </Button>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"outline-danger"} onClick={onHide}>
            Ýap
          </Button>
          <Button variant={"outline-success"} onClick={updateDeviceFunc}>
            Üýtget
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditDevice;
