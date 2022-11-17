import { $authhost, $host } from ".";
import jwt_decode from 'jwt-decode'

export const registration = async (email,name, password)=>{

    const {data} = await $host.post('user/registration', {email, password, name,  role: 'USER'})
    
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password)=>{
    const {data} = await $host.post('user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
} 

export const check = async ()=>{
    const {data} = await $authhost.get('user/auth')
   
    localStorage.setItem('token', data.token)
    console.log(jwt_decode(data.token));
    return jwt_decode(data.token)
}