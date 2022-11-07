import { React, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { updateBanner } from '../../../http/bannerAPI'

const ModalEditBanner = ({ show, onHide, modalEditData }) => {
    const [banner, setBanner] = useState('')
    const [img, setImg] = useState('')

    useEffect(()=>{
        setBanner(modalEditData?.name)
        setImg(modalEditData?.img)
    }, [modalEditData])

    const selectFileOne = (e) => {
        setImg(e.target.files[0])
    }


    const editData = () => { 
        const formData = new FormData()

        formData.append('id', modalEditData.id)
        formData.append('name', banner)
        formData.append('img', img)
        updateBanner(formData).then(data => { window.location.reload() })
    }


    return (
        <div>
            <Modal show={show} onHide={onHide} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        {modalEditData ? modalEditData.name : 'Baş kategoriýany'} üýtgetmek
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control className='my-3' value={banner} onChange={(e) => setBanner(e.target.value)} placeholder={'Banneriň ady'} />
                        <hr />
                        <span className='mt-3 c-bold d-block'>Banneriň suraty</span>
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

export default ModalEditBanner