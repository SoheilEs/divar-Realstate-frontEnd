import api from "../configs/api";


export const getProfile = async()=>{
    try{
        const response = await api.get("user/whoami")
        return response
    }catch(err){
        return {err}
    }
}
export const logOut = async()=>{
    try{
        const response = await api.get("user/logout")
        return response
    }catch(err){
        return {err}
    }
}