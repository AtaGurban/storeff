import { React, useState, useContext } from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { Context } from '../../..'
import { createTitleType } from '../../../http/typeAPI'


const ModalAddTitleType = ({ show, onHide }) => {
    const [titleType, setTitleType] = useState('')
    const [dropType, setDropType] = useState({})
    const { type } = useContext(Context);
 
    const addType = ()=>{
        const formData = new FormData()

        formData.append('name', titleType)
        formData.append('typeId', dropType.id)
        
        createTitleType(formData).then(data => {onHide(); window.location.reload()})
    }
    return (
        <div>
            <Modal show={show} onHide={onHide} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Pod kategoriýa goşmak
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control className='my-3' value={titleType} onChange={(e) => setTitleType(e.target.value)} placeholder={'Pod kategoriýanyň ady'} />
                        <hr />
                        <Dropdown className='mb-5'>
                            <Dropdown.Toggle>
                                {dropType.name || 'Baş kategoriýany saýlaň'}
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
                    <Button variant={'outline-success'} onClick={addType}>Goş</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalAddTitleType