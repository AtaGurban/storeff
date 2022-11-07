import React, { useRef, useContext, useState } from 'react'
import { Context } from '../..'
import { Link } from 'react-router-dom'
import './admin.css'
import AdminTable from './adminComponents/AdminTable'
import { ADMIN_DEVICE_ROUTE } from '../../utils/pathConsts'

const Admin = () => {
    const parentNav = useRef(null)
    const { type, brand, banner } = useContext(Context);
    const [adminState, setAdminState] = useState(false)
    const [tableInfo, setTableInfo] = useState(type.SubTypes[0])
    let boolOne = false
    let boolTwo = false


    const click = (object) => {
        let btns = parentNav.current.childNodes;
        btns.forEach((item) => {
            item.classList.remove('active')
        })
        object.classList.add('active')
        let dataBtn = object.getAttribute('data-type')
        setAdminState(dataBtn)
        if (dataBtn === 'type') {
            let keys = (type.Types[0][0]) ? Object.keys(type.Types[0][0]) : null;
            let values = (type.Types[0]) ? Object.values(type.Types[0]) : null;
            if (values){
                values.unshift(keys)
            }
            setTableInfo(values)
        }
        if (dataBtn === 'title-type') {
            let keys = (type.TitleTypes[0][0]) ? Object.keys(type.TitleTypes[0][0]) : null
            
            let result = []
            if (type.TitleTypes[0]){
                type.TitleTypes[0].map((item)=>{
                    let values = {}
                    for (let key in item){
                        values[key] = item[key]
                    }
                    result.push(values)
                })
            } else{
                result = null
            }
        
            (keys) ? keys[4] = 'Degishli kategoriyasy' : console.log('ff');
            if (!boolOne && result) {
                result.map((item) => {
                    let id = item.typeId

                    if(type.Types[0].filter(type => type.id == id)[0]){
                        item.typeId = type.Types[0].filter(type => type.id == id)[0].name
                    }
                    
                })
            }
            boolOne = true
            if (result){
                result.unshift(keys)
            }
            setTableInfo(result)
        }
        if (dataBtn === 'subtype') {
            let keys = (type.SubTypes[0][0]) ? Object.keys(type.SubTypes[0][0]) : null
            let result = []
            if (type.SubTypes[0]){
                type.SubTypes[0].map((item)=>{
                    let values = {}
                    for (let key in item){
                        values[key] = item[key]
                    }
                    result.push(values)
                })
            } else{
                result = null
            }
            (keys) ? keys[4] = 'Degishli podkategoriyasy' : console.log('ff');
            if (!boolTwo && result) {
                result.map((item) => {
                    let id = item.titleTypeId

                    if(type.TitleTypes[0].filter(type => type.id == id)[0]){
                        item.titleTypeId = type.TitleTypes[0].filter(type => type.id == id)[0].name
                    }
                    
                })
            }
            boolTwo = true
            if (result){
                result.unshift(keys)
            }
            setTableInfo(result)
        }
        if (dataBtn === 'brand') {
            let keys = (brand?.Brands[0][0]) ? Object.keys(brand?.Brands[0][0]) : null
            let result = []
            if (brand?.Brands[0]){
                brand?.Brands[0].map((item)=>{
                    let values = {}
                    for (let key in item){
                        values[key] = item[key]
                    }
                    result.push(values)
                })
            } else{
                result = null
            }
            if (result){
                result.unshift(keys)
            }
            setTableInfo(result)
        }

        if (dataBtn === 'banner'){
            let keys = (banner?.Banners[0][0]) ? Object.keys(banner?.Banners[0][0]) : null
            let result = []
            if (banner?.Banners[0]){
                banner?.Banners[0].map((item)=>{
                    let values = {}
                    for (let key in item){
                        values[key] = item[key]
                    }
                    result.push(values)
                })
            } else{
                result = null
            }
            if (result){
                result.unshift(keys)
            }
            setTableInfo(result)
        }
    }


    return (
        <div className='container mt-3'>
            <div className="admin-wrapper row">
                <div className="admin-nav flex-column d-flex col-2 p-2">
                    <ul ref={parentNav}>
                        <li className='d-block btn btn-outline-primary mb-3' data-type='type' onClick={e => click(e.target)}>Baş kategoriýa</li>
                        <li className='d-block btn btn-outline-primary mb-3' data-type='title-type' onClick={e => click(e.target)}>Pod kategoriýa</li>
                        <li className='d-block btn btn-outline-primary mb-3' data-type='subtype' onClick={e => click(e.target)}>Kiçi kategoriýa</li>
                        <li className='d-block btn btn-outline-primary mb-3' data-type='brand' onClick={e => click(e.target)}>Brendler</li>
                        <li className='d-block btn btn-outline-primary mb-3' data-type='banner' onClick={e => click(e.target)}>Bannerler</li>
                        <Link className='admin-link' to={ADMIN_DEVICE_ROUTE}><li className='d-block btn btn-outline-primary mb-3'>Harytlar</li></Link>
                    </ul>
                </div>
                <div className="admin-inform flex-column d-flex col-10 px-4">
                    {adminState ? <AdminTable data={tableInfo} adminState={adminState} /> : <h1 className='mt-3 text-center'>Admin panele hoş geldiňiz</h1>}
                </div>
            </div>
        </div>
    )
}

export default Admin