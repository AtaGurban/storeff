import { $host } from ".";


export const createBasketDevice = async (basketDevice)=>{
    const {data} = await $host.post('basket', basketDevice)
    return data
}

export const fetchBasketDevices = async (userId)=>{
    const {data} = await $host.get('basket' + userId)
    return data
}

export const deleteBasketDevice = async (id)=>{
    const {data} = await $host.delete(`basket/${id}`)
    return data
}
