import React, { useState} from 'react'
import { observer } from "mobx-react-lite";
// import DropType from './Admin/adminComponents/DropType';
import ModalAddDevice from './Admin/adminComponents/ModalAddDevice';
import AdminDeviceTable from './Admin/adminComponents/AdminDeviceTable';




const AdminDevice = observer(() => {
    const [boolBtn, setBoolBtn] = useState(true)
    const [modalAddDeviceVisible, setModalAddDeviceVisible] = useState(false)
    const [queryParams, setQueryParams] = useState({})


    const currentType = (obj)=>{
        let {typeId, titleTypeId, subTypeId} = obj
        setQueryParams(obj)
        if (subTypeId) {setBoolBtn(false)} 
    }

    return (
        <div className='mx-5'>
            <div className="add-new-btn d-flex mt-3">
                <button onClick={()=>setModalAddDeviceVisible(true)} className='btn btn-warning ms-auto'>Täzesini goş</button>
            </div>
            <div className="row mt-2">
                {/* <div className="col-3 p-3 card">
                    <h4 className='c-bold text-center'>Gerekli bölümi saýlaň</h4>
                        <DropType currentType={currentType}/>
                </div> */}
                <div className="col-12 p-3">
                    <AdminDeviceTable queryParams={queryParams}/>
                </div>
            </div>
            <ModalAddDevice show={modalAddDeviceVisible} onHide={() => setModalAddDeviceVisible(false)} />

        </div>
    )
})

export default AdminDevice