import { $authhost, $host } from ".";


export const createSubDevice = async (device)=>{
    const {data} = await $authhost.post('api/subdevice', device)
    return data
}

export const fetchSubDevices = async (id)=>{
    const {data} = await $host.get(`api/subdevice/${id}`)
    return data
}

export const deleteSubDevice = async (id)=>{
    const {data} = await $authhost.delete(`api/subdevice/${id}`)
    return data
}