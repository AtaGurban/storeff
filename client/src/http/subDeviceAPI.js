import { $authhost, $host } from ".";


export const createSubDevice = async (device)=>{
    const {data} = await $authhost.post('subdevice', device)
    return data
}

export const fetchSubDevices = async (id)=>{
    const {data} = await $host.get(`subdevice/${id}`)
    return data
}

export const deleteSubDevice = async (id)=>{
    const {data} = await $authhost.delete(`subdevice/${id}`)
    return data
}