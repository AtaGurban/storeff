import { React, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createType } from '../../../http/typeAPI'

const ModalAddType = ({ show, onHide }) => {
    const [type, setType] = useState('')
    const [imgOne, setImgOne] = useState(null)
    const [imgTwo, setImgTwo] = useState(null)

    const selectFileOne = (e) => {
        setImgOne(e.target.files[0])
    }

    const selectFileTwo = (e) => {
        setImgTwo(e.target.files[0])
    }

    const addType = ()=>{
        const formData = new FormData()

        formData.append('name', type)
        formData.append('fileOne', imgOne)
        formData.append('fileTwo', imgTwo)
   
        createType(formData).then(data => {onHide(); window.location.reload()})
    }

    return (
        <div>
            <Modal show={show} onHide={onHide} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Baş kategoriýa goşmak
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control className='my-3' value={type} onChange={(e) => setType(e.target.value)} placeholder={'Baş kategoriýanyň ady'} />
                        <hr />
                        <span className='mt-3 c-bold'>Baş kategoriýanyň 1-nji suraty</span>
                        <Form.Control className='my-3' type='file' onChange={selectFileOne} />
                        <hr />
                        <span className='mt-3 c-bold'>Baş kategoriýanyň 2-nji suraty</span>
                        <Form.Control className='my-3' type='file' onChange={selectFileTwo}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-danger'} onClick={onHide}>Ýap</Button>
                    <Button variant={'outline-success'} onClick={addType}>Goş</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalAddType