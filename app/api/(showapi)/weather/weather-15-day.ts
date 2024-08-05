import { AreaCodeResponseData, showapi_res, WeatherData } from '@/lib/types'
import { NextResponse } from 'next/server'

interface Weather15DayProps {
  area: string
  areaCode: string
  areaid: string
  district: string
  prov: string
}

export const Weather15Day = async ({
  area,
  areaCode,
  areaid,
  district,
  prov
}: Weather15DayProps) => {
  try {
    const accessToken = process.env.SHOWAPI_ACCESS_TOKEN || ''
    const tokenHeader = process.env.SHOWAPI_TOKEN_HEADER || ''
    const apiUrl = `https://116afb0c487e1514113b35f0395f895f.xapi.showapi.com/3-9`

    const params = new URLSearchParams({
      area,
      areaCode,
      areaid
    })

    // 发起 POST 请求
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        [tokenHeader]: accessToken
      },
      body: params.toString()
    })

    const data: showapi_res = await response.json()
    // console.log(data)
    if (data.showapi_res_code !== 0) {
      throw new Error(
        `Error request showapi, request id:${data.showapi_res_code}, error message: ${data.showapi_res_error}.  `
      )
    }
    const weatherData = data.showapi_res_body as WeatherData
    weatherData.district = district
    weatherData.prov = prov
    return weatherData
  } catch (error) {
    console.error('showapi获取天气出错', error)
    return null
  }
}
