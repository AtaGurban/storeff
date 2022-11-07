import { React, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createBrand } from '../../../http/brandAPI'

const ModalAddBrand = ({ show, onHide }) => {
    const [brand, setBrand] = useState('')
    const [img, setImg] = useState(null)


    const selectFileOne = (e) => {
        setImg(e.target.files[0])
    }



    const addBrand = ()=>{
        const formData = new FormData()

        formData.append('name', brand)
        formData.append('imgFile', img)

        createBrand(formData).then(data => {onHide(); window.location.reload()})
    }

    return (
        <div>
            <Modal show={show} onHide={onHide} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Brend goşmak
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control className='my-3' value={brand} onChange={(e) => setBrand(e.target.value)} placeholder={'Brendiň ady'} />
                        <hr />
                        <span className='mt-3 c-bold'>Brendiň suraty</span>
                        <Form.Control className='my-3' type='file' onChange={selectFileOne} />

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-danger'} onClick={onHide}>Ýap</Button>
                    <Button variant={'outline-success'} onClick={addBrand}>Goş</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalAddBrand