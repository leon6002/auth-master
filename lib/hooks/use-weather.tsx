'use client'

import { useState, useEffect } from 'react'
import { WeatherData } from '@/lib/types'

function useWeather(cityName: string, toolCallId: string) {
  const [weather, setWeather] = useState<WeatherData>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({ cityName, toolCallId }).toString() // 传递城市参数
        })

        if (response.ok) {
          const responseBody = await response.json()
          if (responseBody.status !== 200) {
            console.log(`Error requesting WeatherData: ${responseBody.msg}`)
            throw new Error(`Error requesting WeatherData: ${responseBody.msg}`)
          }
          const data: WeatherData = responseBody.data

          if (data.ret_code !== 0) {
            setError('Error request showapi weather')
          }
          // 对data里面dayList的数据根据其中areacode字段从小到大进行排序
          data.dayList.sort((a, b) => {
            return parseInt(a.daytime) - parseInt(b.daytime)
          })
          setWeather(data)
        } else {
          setError('fetchWeather response not ok')
        }
      } catch (error) {
        setError('网络请求出错')
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeather()
  }, [cityName, toolCallId]) // 依赖 city 参数

  return { weather, isLoading, error }
}

export default useWeather
