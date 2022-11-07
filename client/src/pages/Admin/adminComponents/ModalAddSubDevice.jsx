import { React, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createSubDevice } from '../../../http/subDeviceAPI'



const ModalAddDevice = ({ show, onHide, device }) => {
   
    const [subDeviceInfo, setSubDeviceInfo] = useState([])

    const [price, setPrice] = useState(null)

    const addInfo = () => {
        setSubDeviceInfo([...subDeviceInfo, { title: '', description: '', number: Date.now() }])
    }

    const removeInfo = (number) => {
        setSubDeviceInfo(subDeviceInfo.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setSubDeviceInfo(subDeviceInfo.map(i => i.number === number ? { ...i, [key]: value } : i))
    }


    const addSubDevice = () => {
        const formData = new FormData()
        formData.append('price', price)
        formData.append('subDeviceInfo', JSON.stringify(subDeviceInfo))
        formData.append('deviceId', device.id)
        createSubDevice(formData).then(data => { onHide(); window.location.reload() })
    }

  

    return (
        <div>
            <Modal show={show} onHide={onHide} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        {device?.name} görnüş goşmak
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="row">

                            <div className="col-6">
                                <Form.Control type='number' className='my-3' value={price} onChange={(e) => setPrice(e.target.value)} placeholder={'Haryt görnüşiň bahasy'} />
                            </div>
                        </div>
                        <hr />
                        <Button variant={'outline-dark'} onClick={addInfo}>Häsiýet goş</Button>
                        {
                            subDeviceInfo.map((item) =>
                                <div key={item.number} className="row mt-3">
                                    <div className="col-4">
                                        <Form.Control value={item.title} onChange={(e) => changeInfo('title', e.target.value, item.number)} placeholder='Häsiýetiň ady' />
                                    </div>
                                    <div className="col-4">
                                        <Form.Control value={item.description} onChange={(e) => changeInfo('description', e.target.value, item.number)} placeholder='Häsiýetiň beýany' />
                                    </div>
                                    <div className="col-4">
                                        <Button onClick={() => removeInfo(item.number)} variant={'danger'}>Poz</Button>
                                    </div>
                                </div>
                            )
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-danger'} onClick={onHide}>Ýap</Button>
                    <Button variant={'outline-success'} onClick={addSubDevice}>Goş</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalAddDevice