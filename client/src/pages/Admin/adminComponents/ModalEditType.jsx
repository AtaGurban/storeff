import { React, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { updateType } from '../../../http/typeAPI'

const ModalEditType = ({ show, onHide, modalEditData }) => {
    const [type, setType] = useState('')
    const [imgOne, setImgOne] = useState('')
    const [imgTwo, setImgTwo] = useState('')

    useEffect(()=>{
        setType(modalEditData?.name)
        setImgOne(modalEditData?.imgOne)
        setImgTwo(modalEditData?.imgTwo)
    }, [modalEditData])

    const selectFileOne = (e) => {
        setImgOne(e.target.files[0])
    }

    const selectFileTwo = (e) => {
        setImgTwo(e.target.files[0])
    }
    const editData = () => {
        const formData = new FormData()

        formData.append('id', modalEditData.id)
        formData.append('name', type)
        formData.append('imgOne', imgOne)
        formData.append('imgTwo', imgTwo)
        updateType(formData).then(data => { window.location.reload() })
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
                        <Form.Control className='my-3' value={type} onChange={(e) => setType(e.target.value)} placeholder={'Baş kategoriýanyň ady'} />
                        <hr />
                        <span className='mt-3 c-bold'>Baş kategoriýanyň 1-nji suraty</span>
                        <img className='my-3' src={`${process.env.REACT_APP_API_URL}:5000/${imgOne}`} alt={imgOne} />
                        <Form.Control className='my-3' type='file' onChange={selectFileOne} />
                        <hr />
                        <span className='mt-3 c-bold'>Baş kategoriýanyň 2-nji suraty</span>
                        <img className='my-3' src={`${process.env.REACT_APP_API_URL}:5000/${imgTwo}`} alt={imgOne} />
                        <Form.Control className='my-3' type='file' onChange={selectFileTwo} />
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

export default ModalEditType