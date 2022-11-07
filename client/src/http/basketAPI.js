import { $host } from ".";


export const createBasketDevice = async (basketDevice)=>{
    const {data} = await $host.post('api/basket', basketDevice)
    return data
}

export const fetchBasketDevices = async (userId)=>{
    const {data} = await $host.get('api/basket' + userId)
    return data
}

export const deleteBasketDevice = async (id)=>{
    const {data} = await $host.delete(`api/basket/${id}`)
    return data
}
