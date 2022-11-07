import { $authhost, $host } from ".";


export const createType = async (type)=>{
    const {data} = await $authhost.post('api/type', type)
    return data
}

export const createTitleType = async (titleType)=>{
    const {data} = await $authhost.post('api/titletype', titleType)
    return data
}

export const createSubType = async (subType)=>{
    const {data} = await $authhost.post('api/subtype', subType)
    return data
}

export const fetchCategories = async ()=>{
    const {data} = await $host.get('api/category')
    return data
}
export const fetchTypes = async ()=>{
    const {data} = await $host.get('api/type')
    return data
}

export const fetchTitleTypes = async ()=>{
    const {data} = await $host.get('api/titletype')
    return data
}

export const fetchSubTypes = async ()=>{
    const {data} = await $host.get('api/subtype')
    return data
}

export const deleteType = async (id)=>{
    const {data} = await $authhost.delete(`api/type/${id}`)
    return data
}

export const deleteTitleType = async (id)=>{
    const {data} = await $authhost.delete(`api/titletype/${id}`)
    return data
}

export const deleteSubType = async (id)=>{
    const {data} = await $authhost.delete(`api/subtype/${id}`)
    return data
}

export const updateType = async (type)=>{
    const {data} = await $authhost.put('api/type', type)
    return data
}

export const updateTitleType = async (type)=>{
    const {data} = await $authhost.put('api/titletype', type)
    return data
}

export const updateSubType = async (type)=>{
    const {data} = await $authhost.put('api/subtype', type)
    return data
}