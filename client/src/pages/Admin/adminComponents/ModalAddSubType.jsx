import { React, useState, useContext } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../../..";
import { createSubType } from "../../../http/typeAPI";

const ModalAddSubType = ({ show, onHide }) => {
  const [subType, setSubType] = useState("");
  const [dropType, setDropType] = useState({});
  const [dropTitleType, setDropTitleType] = useState({});
  const [typeArr, setTypeArr] = useState([]);
  const { type } = useContext(Context);

  const addType = () => {
    const formData = new FormData();

    formData.append("name", subType);
    formData.append("titleTypeId", dropType.id);

    createSubType(formData).then((data) => {
      onHide();
      window.location.reload();
    });
  };

  const changeType = (arg)=>{
    setDropTitleType(arg)
    let result
    result = type.TitleTypes[0].filter((item)=>{
        return item.typeId === arg.id
    })
    setTypeArr(result)
  }

  return (
    <div>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Kici kategoriýa goşmak
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              className="my-3"
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
              placeholder={"Kiçi kategoriýanyň ady"}
            />
            <hr />
            <div className="d-flex">
              <Dropdown className="mb-5 mx-3">
                <Dropdown.Toggle>
                  {dropTitleType.name || "Baş kategoriýany saýlaň"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {type.Types[0].map((type) => (
                    <Dropdown.Item
                      onClick={() => changeType(type)}
                      key={type.id}
                    >
                      {type.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="mb-5 mx-3">
                <Dropdown.Toggle disabled = {typeArr.length === 0}>
                  {dropType.name || "Pod kategoriýany saýlaň"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {typeArr.map((type) => (
                    <Dropdown.Item
                      onClick={() => setDropType(type)}
                      key={type.id}
                    >
                      {type.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"outline-danger"} onClick={onHide}>
            Ýap
          </Button>
          <Button variant={"outline-success"} onClick={addType}>
            Goş
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddSubType;
