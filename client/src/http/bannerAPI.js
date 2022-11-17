import { $authhost, $host } from ".";


export const createBanner = async (banner)=>{
    const {data} = await $authhost.post('banner', banner)
    return data
}

export const fetchBanners = async ()=>{
    const {data} = await $host.get('banner')
    return data
}

export const deleteBanner = async (id)=>{
    const {data} = await $authhost.delete(`banner/${id}`)
    return data
}

export const updateBanner = async (banner)=>{
    const {data} = await $authhost.put('banner', banner)
    return data
}