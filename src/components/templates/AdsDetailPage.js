import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { adsDetail } from '../../services/ads'
import { Divider } from '@mui/material'

function AdsDetailPage() {
    const {data:user} = useQuery({queryKey:["profile"]})
    const id = useParams().id
    const { data, isLoading} = useQuery({queryKey:["adsDetail",id],queryFn:({queryKey})=>adsDetail(queryKey[1])})
    const ads = data?.data?.data[0]
    console.log(ads);

  return (
    <div>
        <h3>جزئیات آگهی ثبت شده</h3>
        <Divider
          sx={{
            borderBottomWidth: "4px",
            borderRadius: "10px",
            backgroundColor: "#C70039",
            my: "10px",
            width: "190px",
          }}
        />
        <div>
            <div>
                <h3>{ads.title}</h3>

            </div>
            <div>
                {
                    ads?.images.map( image => <img src={`${process.env.REACT_APP_SERVER_URL}${image}`} alt={ads.title} />)
                }
            </div>
        </div>
    </div>
  )
}

export default AdsDetailPage