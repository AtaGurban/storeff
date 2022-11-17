import React from 'react'
import { Link } from 'react-router-dom'

const SearchProduct = ({name, img, id, setSearchPanelVisible, setSearchQuery}) => {
const click = ()=>{
    setSearchPanelVisible(false)
    setSearchQuery('')
}

    return (
        <div onClick={()=>click()}>
            <Link to={`product/detail/${id}`} className="wrapper-search-product d-flex p-2">
                <div className="search-product-img">
                    <img src={`${process.env.REACT_APP_API_URL}${img}`} alt="" />
                </div>
                <div className="ms-3 search-product-name">{name}</div>
            </Link>
        </div>
    )
}

export default SearchProduct