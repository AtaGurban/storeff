import { $authhost, $host } from ".";


export const createBanner = async (banner)=>{
    const {data} = await $authhost.post('api/banner', banner)
    return data
}

export const fetchBanners = async ()=>{
    const {data} = await $host.get('api/banner')
    return data
}

export const deleteBanner = async (id)=>{
    const {data} = await $authhost.delete(`api/banner/${id}`)
    return data
}

export const updateBanner = async (banner)=>{
    const {data} = await $authhost.put('api/banner', banner)
    return data
}