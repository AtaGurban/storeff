import { React, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createBanner } from '../../../http/bannerAPI'

const ModalAddBrand = ({ show, onHide }) => {
    const [banner, setBanner] = useState('')
    const [img, setImg] = useState(null)


    const selectFileOne = (e) => {
        setImg(e.target.files[0])
    }



    const addBanner = ()=>{
        const formData = new FormData()

        formData.append('name', banner)
        formData.append('imgFile', img)

        createBanner(formData).then(data => {onHide(); window.location.reload()})
    }

    return (
        <div>
            <Modal show={show} onHide={onHide} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Banner goşmak
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control className='my-3' value={banner} onChange={(e) => setBanner(e.target.value)} placeholder={'Banneriň ady'} />
                        <hr />
                        <span className='mt-3 c-bold'>Banneriň suraty</span>
                        <Form.Control className='my-3' type='file' onChange={selectFileOne} />

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-danger'} onClick={onHide}>Ýap</Button>
                    <Button variant={'outline-success'} onClick={addBanner}>Goş</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalAddBrand