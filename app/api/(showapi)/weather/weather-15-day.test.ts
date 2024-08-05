import { Weather15Day } from './weather-15-day'

describe('AreaCode function', () => {
  it('should return area code for valid city', async () => {
    process.env.SHOWAPI_ACCESS_TOKEN = '4ea01a1902a63990fd507a1c4b470908'
    process.env.SHOWAPI_TOKEN_HEADER = 'showapi-access-token'
    const response = await Weather15Day({
      area: '丽江',
      areaCode: '530700',
      areaid: '101291401'
    })
    expect(response.status).toBe(200)
    const data = await response.json()
    console.log(data)
    expect(data).toHaveProperty('ret_code', 0)
  })
})
