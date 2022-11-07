import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { fetchOneDevice } from '.././http/deviceAPI'
import { fetchSubDevices, deleteSubDevice } from '../http/subDeviceAPI';
import ModalAddSubDevice from './Admin/adminComponents/ModalAddSubDevice'


const AdminSubDevice = () => {
    const params = useParams();
    const [device, setDevice] = useState(null)
    const [subDevice, setSubDevice] = useState([])
    const [modalAddSubDeviceVisible, setModalAddSubDeviceVisible] = useState(false)

    useEffect(async () => {
        await fetchOneDevice(params.id).then(data => setDevice(data))
        await fetchSubDevices(params.id).then(data => setSubDevice(data))
    }, [])

    const removeSubDevice = (id)=>{
        deleteSubDevice(id).then(data => { window.location.reload() })
    }

    const tableAttributes = ['id', 'Bahasy', 'Häsiýetleri', 'Döredilen wagty', 'Üýtgedilen wagty', 'Düwmeler']

    return (
        <div className='container'>
            <div className="d-flex add-new my-3 ">
                <button onClick={() => setModalAddSubDeviceVisible(true)} className="ms-auto btn btn-warning">Täzesini goş</button>
            </div>
            {
                !(subDevice.length === 0) ?
                    <div>
                        <table border='2' className='mt-3'>
                            <thead>
                                <tr>
                                    {
                                        tableAttributes.map((item, index) =>
                                            <th key={index} className='p-1'>{item}</th>
                                        )
                                    }

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subDevice.map((item) =>
                                        <tr key={item.id}>
                                            <td className='p-1'>
                                                {item.id}
                                            </td>
                                            <td className='p-1'>
                                                {item.price}
                                            </td>
                                            <td className='p-1'>
                                                {item.info.map((item) => 
                                                    <div>
                                                        <span className='c-bold'>{item.title}</span>:
                                                        <span>{item.description}</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className='p-1'>
                                                {item.createdAt}
                                            </td>
                                            <td className='p-1'>
                                                {item.updatedAt}
                                            </td>
                                            <td className='p-1'>
                                                <button onClick={()=> removeSubDevice(item.id)} className='btn btn-danger'>Pozmak</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>


                    </div>

                    :
                    <h1 className='text-center mt-3'>Maglumatlar ýok</h1>
            }
            <ModalAddSubDevice device={device} show={modalAddSubDeviceVisible} onHide={() => setModalAddSubDeviceVisible(false)} />
        </div>
    )
}

export default AdminSubDevice