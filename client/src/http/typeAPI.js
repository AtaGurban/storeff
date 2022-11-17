import { $authhost, $host } from ".";


export const createType = async (type)=>{
    const {data} = await $authhost.post('type', type)
    return data
}

export const createTitleType = async (titleType)=>{
    const {data} = await $authhost.post('titletype', titleType)
    return data
}

export const createSubType = async (subType)=>{
    const {data} = await $authhost.post('subtype', subType)
    return data
}

export const fetchCategories = async ()=>{
    const {data} = await $host.get('category')
    return data
}
export const fetchTypes = async ()=>{
    const {data} = await $host.get('type')
    return data
}

export const fetchTitleTypes = async ()=>{
    const {data} = await $host.get('titletype')
    return data
}

export const fetchSubTypes = async ()=>{
    const {data} = await $host.get('subtype')
    return data
}

export const deleteType = async (id)=>{
    const {data} = await $authhost.delete(`type/${id}`)
    return data
}

export const deleteTitleType = async (id)=>{
    const {data} = await $authhost.delete(`titletype/${id}`)
    return data
}

export const deleteSubType = async (id)=>{
    const {data} = await $authhost.delete(`subtype/${id}`)
    return data
}

export const updateType = async (type)=>{
    const {data} = await $authhost.put('type', type)
    return data
}

export const updateTitleType = async (type)=>{
    const {data} = await $authhost.put('titletype', type)
    return data
}

export const updateSubType = async (type)=>{
    const {data} = await $authhost.put('subtype', type)
    return data
}