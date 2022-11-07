import { $authhost, $host } from ".";


export const createBrand = async (brand)=>{
    const {data} = await $authhost.post('api/brand', brand)
    return data
}

export const fetchBrands = async ()=>{
    const {data} = await $host.get('api/brand')
    return data
}

export const deleteBrand = async (id)=>{
    const {data} = await $authhost.delete(`api/brand/${id}`)
    return data
}

export const updateBrand = async (brand)=>{
    const {data} = await $authhost.put('api/brand', brand)
    return data
}