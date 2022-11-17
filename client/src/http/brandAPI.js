import { $authhost, $host } from ".";


export const createBrand = async (brand)=>{
    const {data} = await $authhost.post('brand', brand)
    return data
}

export const fetchBrands = async ()=>{
    const {data} = await $host.get('brand')
    return data
}

export const deleteBrand = async (id)=>{
    const {data} = await $authhost.delete(`brand/${id}`)
    return data
}

export const updateBrand = async (brand)=>{
    const {data} = await $authhost.put('brand', brand)
    return data
}