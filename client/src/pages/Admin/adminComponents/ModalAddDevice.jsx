import { React, useState, useContext } from "react";
import { Button, Form, Modal, Dropdown } from "react-bootstrap";
import { createDevice } from "../../../http/deviceAPI";
import DropType from "./DropType";
import { Context } from "../../..";

const ModalAddDevice = ({ show, onHide }) => {
  const [boolBtn, setBoolBtn] = useState(true);
  const { brand } = useContext(Context);
  const [bigDesc, setBigDesc] = useState("");
  const [DeviceMoreInfo, setDeviceMoreInfo] = useState([]);
  const [littleDesc, setLittleDesc] = useState("");
  const [device, setDevice] = useState("");
  const [favouriteDevice, setfavouriteDevice] = useState(false);
  const [price, setPrice] = useState(null);
  const [img, setImg] = useState([]);
  const [dropBrand, setDropBrand] = useState({});
  const [typeId, setTypeId] = useState(null);
  const [titleTypeId, setTitleTypeId] = useState(null);
  const [subTypeId, setSubTypeId] = useState(null);

  const addImg = () => {
    setImg([...img, { file: "", number: Date.now() }]);
  };

  const selectFileOne = (file, number) => {
    setImg(img.map((i) => (i.number === number ? { ...i, file: file } : i)));
  };
  const currentType = (obj) => {
    setTypeId(obj.typeId);
    setTitleTypeId(obj.titleTypeId);
    setSubTypeId(obj.subTypeId);
    if (subTypeId) {
      setBoolBtn(false);
    }
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

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", device);
    formData.append("price", price);
    for (let i = 0; i < img.length; i++) {
      let file = img[i];
      formData.append("img[" + i + "]", file.file);
    }
    formData.append("typeId", typeId);
    formData.append("titleTypeId", titleTypeId);
    formData.append("subTypeId", subTypeId);
    formData.append("DeviceMoreInf", JSON.stringify(DeviceMoreInfo));
    formData.append("brandId", dropBrand.id);
    formData.append("favourite", favouriteDevice);
    formData.append("big", bigDesc);
    formData.append("little", littleDesc);

    createDevice(formData).then((data) => {
      onHide();
      window.location.reload();
    });
  };

  const removeImg = (number) => {
    setImg(img.filter((i) => i.number !== number));
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
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    onChange={(e) => setfavouriteDevice(() => !favouriteDevice)}
                    type="checkbox"
                    label="Saýlanan haryt"
                  />
                </Form.Group>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <h4 className="text-center mb-2">
                  Harydyň kategoriýasyny görkeziň
                </h4>
                <DropType currentType={currentType} />
              </div>
              <div className="col-6">
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
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-6">
                <h4 className="text-center mb-2">
                  Harydyň kiçi beýanyny görkeziň
                </h4>
                <div className="input-group">
                  <textarea
                    style={{ height: "150px", maxHeight: "350px" }}
                    className="form-control"
                    value={littleDesc}
                    onChange={(e) => setLittleDesc(e.target.value)}
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
                  className="form-control"
                  value={bigDesc}
                  onChange={(e) => setBigDesc(e.target.value)}
                  aria-label="With textarea"
                ></textarea>
              </div>
            </div>
            <hr />
            <span className="my-3 c-bold d-block">Harydyň suraty</span>
            <Button variant={"outline-dark"} onClick={addImg}>
              Surat goş
            </Button>
            {img.map((item) => (
              <div key={item.number} className="row mt-3">
                <div className="col-8">
                  <Form.Control
                    className=""
                    type="file"
                    onChange={(e) =>
                      selectFileOne(e.target.files[0], item.number)
                    }
                  />
                </div>
                <div className="col-4">
                  <Button
                    onClick={() => removeImg(item.number)}
                    variant={"danger"}
                  >
                    Poz
                  </Button>
                </div>
              </div>
            ))}
          </Form>
          <hr />
          <Button variant={"outline-dark"} onClick={addMoreInfo}>
            Goşmaça häsiýet goş
          </Button>
          {DeviceMoreInfo.map((item) => (
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
          <Button variant={"outline-success"} onClick={addDevice}>
            Goş
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddDevice;
