import api from "../configs/api"


export const sendOtp = async(mobile)=>{
    try{
        const response = await api.post("auth/send-otp",{mobile})
        return response.data
    }catch(err){
        return {err}
    }
}
export const checkOtp = async(mobile,code)=>{
    try{
        const response = await api.post("auth/check-otp",{mobile,code})
        return response
    }catch(err){
        return {err}
    }
}



