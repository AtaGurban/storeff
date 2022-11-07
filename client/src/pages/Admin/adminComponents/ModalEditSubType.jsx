import { React, useState, useContext, useEffect } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../../..";
import { updateSubType } from "../../../http/typeAPI";

const ModalAddSubType = ({ show, onHide, modalEditData }) => {
    const [subType, setSubType] = useState("");
    const [dropType, setDropType] = useState({});
    const [dropTitleType, setDropTitleType] = useState({});
    const [typeArr, setTypeArr] = useState([]);
    const { type } = useContext(Context);
  
    const editType = () => {
      const formData = new FormData();
  
      formData.append("id", modalEditData.id);
      formData.append("name", subType);
      formData.append("titleTypeId", dropType.id);
  
      updateSubType(formData).then((data) => {
        onHide();
        window.location.reload();
      });
    };
    

    useEffect(()=>{
        setSubType(modalEditData?.name)
        queryTitleType(modalEditData?.titleTypeId)
    }, [modalEditData])

    const queryTitleType = (id)=>{
        let titleType = type.TitleTypes[0].filter((item)=>{
            return item.name === id
        })
        let queryType = type.Types[0].filter((item)=>{
            return item.id === titleType[0]?.typeId
        })
        let result
        result = type.TitleTypes[0].filter((item)=>{
            return item.typeId === titleType[0]?.id
        })
        setTypeArr(result)

        setDropTitleType(queryType[0])
  

    }

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
          {modalEditData ? modalEditData.name : 'Pod kategoriýany'} üýtgetmek
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
                  {dropTitleType?.name || "Baş kategoriýany saýlaň"}
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
                  {dropType?.name || "Pod kategoriýany saýlaň"}
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
          <Button variant={"outline-success"} onClick={editType}>
            Üýtget
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddSubType;
