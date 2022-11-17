import { $authhost, $host } from ".";


export const createDevice = async (device)=>{
    const {data} = await $authhost.post('device', device)
    return data
}

export const fetchDevices = async (query)=>{
    const {data} = (query !== '?') ? await $host.get('device' + query) : await $host.get('api/device')
    console.log(query, data);
    return data
}

export const fetchSearchDevices = async (query)=>{
    const {data} = await $host.get('device?query=' + query) 
    return data
} 

export const fetchOneDevice = async (id)=>{
    const {data} = await $host.get(`device/${id}`)
    return data
}

export const deleteDevice = async (id)=>{
    const {data} = await $authhost.delete(`device/${id}`)
    return data
}

export const updateDevice = async (device)=>{
    const {data} = await $authhost.put('device', device)
    return data
}