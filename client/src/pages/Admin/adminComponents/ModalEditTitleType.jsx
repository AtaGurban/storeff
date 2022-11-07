import { React, useState, useContext, useEffect } from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { Context } from '../../..'
import { updateTitleType } from '../../../http/typeAPI'


const ModalAddTitleType = ({ show, onHide, modalEditData }) => {
    const [titleType, setTitleType] = useState('')
    const [dropType, setDropType] = useState({})

    useEffect(()=>{
        setTitleType(modalEditData?.name)
        setDropType(modalEditData?.typeId)
    }, [modalEditData])


    const { type } = useContext(Context);
 
    const editType = ()=>{
        const formData = new FormData()
        formData.append('id', modalEditData?.id)
        formData.append('name', titleType)
        formData.append('typeId', dropType.id)
        
        updateTitleType(formData).then(data => {onHide(); window.location.reload()})
    }
    return (
        <div>
            <Modal show={show} onHide={onHide} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                    {modalEditData ? modalEditData.name : 'Pod kategoriýany'} üýtgetmek
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control className='my-3' value={titleType} onChange={(e) => setTitleType(e.target.value)} placeholder={'Pod kategoriýanyň ady'} />
                        <hr />
                        <Dropdown className='mb-5'>
                            <Dropdown.Toggle>
                                {dropType?.name || 'Baş kategoriýany saýlaň'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    type.Types[0].map((type)=>
                                        <Dropdown.Item onClick={()=> setDropType(type)} key={type.id}>{type.name}</Dropdown.Item>
                                    )
                                }
                            </Dropdown.Menu>
                        </Dropdown>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-danger'} onClick={onHide}>Ýap</Button>
                    <Button variant={'outline-success'} onClick={editType}>Üýtget</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalAddTitleType