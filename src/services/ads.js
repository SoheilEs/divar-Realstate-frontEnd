import api from "../configs/api";


const userAds = async() =>{
    try{
        const response = await api.get('/ads/user-ads')
        return response
    
    }catch(err){
        return err
    }
}
const adsDetail = async(id) =>{
    try{
        const response = await api.get(`/ads/${id}`)
        return response
    
    }catch(err){
        return err
    }
}

const getOptions = async (id) => {
    try{
        const response = await api.get(`/options/by-category/${id}`)
        return response
    }catch(err){
        return err
    }
}

export {
    getOptions,
    userAds,
    adsDetail
}



