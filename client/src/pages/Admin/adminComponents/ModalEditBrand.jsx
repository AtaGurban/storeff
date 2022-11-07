import { React, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { updateBrand } from '../../../http/brandAPI'

const ModalEditBrand = ({ show, onHide, modalEditData }) => {
    const [brand, setBrand] = useState('')
    const [img, setImg] = useState('')

    useEffect(()=>{
        setBrand(modalEditData?.name)
        setImg(modalEditData?.img)
    }, [modalEditData])

    const selectFileOne = (e) => {
        setImg(e.target.files[0])
    }


    const editData = () => { 
        const formData = new FormData()

        formData.append('id', modalEditData.id)
        formData.append('name', brand)
        formData.append('img', img)
        updateBrand(formData).then(data => { window.location.reload() })
    }


    return (
        <div>
            <Modal show={show} onHide={onHide} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        {modalEditData ? modalEditData.name : 'Brendi'} üýtgetmek
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control className='my-3' value={brand} onChange={(e) => setBrand(e.target.value)} placeholder={'Brendiň ady'} />
                        <hr />
                        <span className='mt-3 c-bold d-block'>Brendiň suraty</span>
                        <img className='my-3' src={`${process.env.REACT_APP_API_URL}:5000/${img}`} alt={img} />
                        <Form.Control className='my-3' type='file' onChange={selectFileOne} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-danger'} onClick={onHide}>Ýap</Button>
                    <Button variant={'outline-success'} onClick={editData}>Üýtget</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalEditBrand