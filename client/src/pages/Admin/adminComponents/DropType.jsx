import React, { useState, useContext, useEffect } from 'react'
import { Context } from "../../..";
import { Dropdown } from 'react-bootstrap'

const DropType = ({ currentType, currentEditDevice }) => {
    const { type } = useContext(Context);
    const [dropType, setDropType] = useState({})
    const [dropTitleType, setDropTitleType] = useState({})
    const [dropSubType, setDropSubType] = useState({})
    const [currentdropTitleTypes, setCurrentDropTitleTypes] = useState([])
    const [currentdropSubTypes, setCurrentDropSubTypes] = useState([])


    useEffect(() => {
        if (currentEditDevice) {
            setDropType(() => type.Types[0].filter(i => i.id === currentEditDevice.typeId)[0])
            setDropTitleType(() => type.TitleTypes[0].filter(i => i.id === currentEditDevice.titleTypeId)[0])
            setDropSubType(() => type.SubTypes[0].filter(i => i.id === currentEditDevice.subTypeId)[0])
        }
    }, [])


    useEffect(() => {
        let result = type.TitleTypes[0].filter((item) => {
            return item.typeId === dropType.id
        })
        setCurrentDropTitleTypes(result)

    }, [dropType])

    useEffect(() => {
        let result = type.SubTypes[0].filter((item) => {
            return item.titleTypeId === dropTitleType.id
        })
        setCurrentDropSubTypes(result)

    }, [dropTitleType])

    useEffect(() => {
        let obj = {}
        obj.typeId = dropType.id
        obj.titleTypeId = dropTitleType.id
        obj.subTypeId = dropSubType.id
        currentType(obj)
    }, [dropSubType])
    return (
        <div>
            <div style={{ flexDirection: 'column', alignItems: 'center' }} className="dropdowns d-flex">
                <Dropdown className='mb-3'>
                    <Dropdown.Toggle>
                        {dropType.name || 'Baş kategoriýany saýlaň'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            type.Types[0].map((type) =>
                                <Dropdown.Item onClick={() => setDropType(type)} key={type.id}>{type.name}</Dropdown.Item>
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mb-3'>
                    <Dropdown.Toggle disabled={currentdropTitleTypes.length === 0}>
                        {dropTitleType.name || 'Pod kategoriýany saýlaň'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            currentdropTitleTypes.map((type) =>
                                <Dropdown.Item onClick={() => setDropTitleType(type)} key={type.id}>{type.name}</Dropdown.Item>
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mb-3'>
                    <Dropdown.Toggle disabled={currentdropSubTypes.length === 0}>
                        {dropSubType.name || 'Kiçi kategoriýany saýlaň'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            currentdropSubTypes.map((type) =>
                                <Dropdown.Item onClick={() => setDropSubType(type)} key={type.id}>{type.name}</Dropdown.Item>
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default DropType