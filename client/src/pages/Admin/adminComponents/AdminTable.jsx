import { React, useState } from 'react'
import ModalAddType from './ModalAddType'
import ModalAddTitleType from './ModalAddTitleType'
import ModalAddSubType from './ModalAddSubType'
import ModalAddBrand from './ModalAddBrand'
import ModalEditType from './ModalEditType'
import ModalEditBrand from './ModalEditBrand'
import ModalEditTitleType from './ModalEditTitleType'
import ModalEditSubType from './ModalEditSubType'
import ModalAddBanner from './ModalAddBanner'
import ModalEditBanner from './ModalEditBanner'
import { deleteSubType, deleteType, deleteTitleType, } from '../../../http/typeAPI'
import { deleteBrand } from '../../../http/brandAPI'
import { Pagination } from 'react-bootstrap'
import { deleteBanner } from '../../../http/bannerAPI'

const AdminTable = ({ data, adminState }) => {
    const [modalAddTypeVisible, setModalAddTypeVisible] = useState(false)
    const [modalAddTitleTypeVisible, setModalAddTitleTypeVisible] = useState(false)
    const [modalAddSubTypeVisible, setModalAddSubTypeVisible] = useState(false)
    const [modalAddBrandVisible, setModalAddBrandVisible] = useState(false)
    const [modalAddBannerVisible, setModalAddBannerVisible] = useState(false)
    const [modalEditTypeVisible, setModalEditTypeVisible] = useState(false)
    const [modalEditBrandVisible, setModalEditBrandVisible] = useState(false)
    const [modalEditBannerVisible, setModalEditBannerVisible] = useState(false)
    const [modalEditTitleTypeVisible, setModalEditTitleTypeVisible] = useState(false)
    const [modalEditSubTypeVisible, setModalEditSubTypeVisible] = useState(false)
    const [modalEditData, setModalEditData] = useState(null)
    const [paginationActive, setPaginationActive] = useState(1)

    const addNew = () => {
        if (adminState === 'type') {
            setModalAddTypeVisible(() => true)
        }
        if (adminState === 'title-type') {
            setModalAddTitleTypeVisible(() => true)
        }
        if (adminState === 'subtype') {
            setModalAddSubTypeVisible(() => true)
        }
        if (adminState === 'brand') {
            setModalAddBrandVisible(() => true)
        }
        if (adminState === 'banner') {
            setModalAddBannerVisible(() => true)
        }
    }

    const deleteData = (id) => {
        if (adminState === 'type') {
            deleteType(id).then(data => { window.location.reload() })
        }
        if (adminState === 'title-type') {
            deleteTitleType(id).then(data => { window.location.reload() })
        }
        if (adminState === 'subtype') {
            deleteSubType(id).then(data => { window.location.reload() })
        }
        if (adminState === 'brand') {
            deleteBrand(id).then(data => { window.location.reload() })
        }
        if (adminState === 'banner') {
            deleteBanner(id).then(data => { window.location.reload() })
        }

    }

    const showModalEditType = (typeData) => {
        if (adminState === 'type') {
            setModalEditTypeVisible(true)
        }
        if (adminState === 'title-type') {
            setModalEditTitleTypeVisible(true)
        }
        if (adminState === 'subtype') {
            setModalEditSubTypeVisible(true)
        }
        if (adminState === 'brand') {
            setModalEditBrandVisible(true)
        }
        if (adminState === 'banner') {
            setModalEditBannerVisible(true)
        }
        setModalEditData(typeData)
    }

    let values = data ? [...data] : null;
    if (values) values.shift()

    if (adminState === 'subtype') {
        values.sort(function (a, b) {
            let x = a.titleTypeId.toLowerCase();
            let y = b.titleTypeId.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        });

    }
    if (adminState === 'title-type') {
        values.sort(function (a, b) {
            let x = a.typeId.toLowerCase();
            let y = b.typeId.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        });

    }


    let paginationLimit = 10
    let items = [];
    for (let number = 1; number < (values.length / paginationLimit) + 1; number++) {
        items.push(
            <Pagination.Item onClick={(e) => setPaginationActive(number)} key={number} active={number === paginationActive}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <div className="add-new mt-3 ">
                <button onClick={() => addNew()} className="btn btn-warning">Täzesini goş</button>
            </div>
            {
                !(data[0] === null) ?
                    <div>
                        <table border='2' className='mt-3'>
                            <thead>
                                <tr>
                                    {
                                        data[0].map((item, index) =>
                                            <th key={index} className='p-1'>{item}</th>
                                        )
                                    }
                                    <th className='p-1'>Düwmeler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(adminState === 'subtype') ?
                                    (
                                        values.slice((paginationActive - 1) * paginationLimit, (paginationActive - 1) * paginationLimit + paginationLimit).map((item) =>
                                            <tr key={item.id}>
                                                {
                                                    Object.values(item).map((data, index) => (
                                                        <td key={index} className='p-1'>{data}</td>
                                                    ))
                                                }
                                                <td style={{ borderWidth: '1px', justifyContent: 'center' }} className='p-1 d-flex '>
                                                    <button onClick={() => showModalEditType(item)} className='btn btn-success me-2'>Üýtgetmek</button>
                                                    <button onClick={e => deleteData(item.id)} className='btn btn-danger'>Pozmak</button>

                                                </td>
                                            </tr>
                                        )
                                    ) :
                                    (values.map((item) =>
                                        <tr key={item.id}>
                                            {
                                                Object.values(item).map((data, index) => (
                                                    <td key={index} className='p-1'>{data}</td>
                                                ))
                                            }
                                            <td style={{ borderWidth: '1px', justifyContent: 'center' }} className='p-1 d-flex '>
                                                <button onClick={() => showModalEditType(item)} className='btn btn-success me-2'>Üýtgetmek</button>
                                                <button onClick={e => deleteData(item.id)} className='btn btn-danger'>Pozmak</button>

                                            </td>
                                        </tr>
                                    ))}

                            </tbody>


                        </table>
                        <div className="mt-3">
                            <Pagination style={{ justifyContent: 'center' }}>{items}</Pagination>
                        </div>

                    </div>

                    :
                    <h1 className='text-center mt-3'>Maglumatlar ýok</h1>
            }

            <ModalAddType show={modalAddTypeVisible} onHide={() => setModalAddTypeVisible(false)} />
            <ModalAddTitleType show={modalAddTitleTypeVisible} onHide={() => setModalAddTitleTypeVisible(false)} />
            <ModalAddSubType show={modalAddSubTypeVisible} onHide={() => setModalAddSubTypeVisible(false)} />
            <ModalAddBrand show={modalAddBrandVisible} onHide={() => setModalAddBrandVisible(false)} />
            <ModalAddBanner show={modalAddBannerVisible} onHide={() => setModalAddBannerVisible(false)} />
            <ModalEditType modalEditData={modalEditData} show={modalEditTypeVisible} onHide={() => setModalEditTypeVisible(false)} />
            <ModalEditBrand modalEditData={modalEditData} show={modalEditBrandVisible} onHide={() => setModalEditBrandVisible(false)} />
            <ModalEditBanner modalEditData={modalEditData} show={modalEditBannerVisible} onHide={() => setModalEditBannerVisible(false)} />
            <ModalEditTitleType modalEditData={modalEditData} show={modalEditTitleTypeVisible} onHide={() => setModalEditTitleTypeVisible(false)} />
            <ModalEditSubType modalEditData={modalEditData} show={modalEditSubTypeVisible} onHide={() => setModalEditSubTypeVisible(false)} />
        </div>
    )
}

export default AdminTable