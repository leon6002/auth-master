// import { http } from 'msw'
// import { setupServer } from 'msw/node'
import { NextRequest } from 'next/server'
import { POST } from './route'

describe('AreaCode function', () => {
  it('should return area code for valid city', async () => {
    process.env.SHOWAPI_ACCESS_TOKEN = '4ea01a1902a63990fd507a1c4b470908'
    process.env.SHOWAPI_TOKEN_HEADER = 'showapi-access-token'
    const request = new NextRequest('http://localhost:3000', {
      method: 'POST',
      body: new URLSearchParams({ cityName: '丽江' })
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    console.log(data)
    expect(data).toHaveProperty('ret_code', 0)
  })
})
