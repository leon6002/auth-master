// import { http } from 'msw'
// import { setupServer } from 'msw/node'
import { AreaCode } from './area-code'
import { AreaCodeResponseData } from '@/lib/types'

// 设置 Mock Service Worker
// const server = setupServer(
//   rest.post('https://116afb0c487e1514113b35f0395f895f.xapi.showapi.com/3-3', (req, res, ctx) => {
//     const city = req.url.searchParams.get('area')
//     // 根据城市返回模拟数据
//     if (city === '北京') {
//       return res(
//         ctx.json({
//           showapi_res_code: 0,
//           showapi_res_body: {
//             ret_code: 0,
//             areaCode: '110000'
//           } as AreaCodeResponseData
//         })
//       )
//     } else {
//       return res(ctx.json({ showapi_res_code: -1, showapi_res_error: 'City not found' }))
//     }
//   })
// )

// // 测试开始前启动 Mock Server
// beforeAll(() => server.listen())

// // 每个测试用例后重置 Mock Server
// afterEach(() => server.resetHandlers())

// // 测试结束后关闭 Mock Server
// afterAll(() => server.close())

describe('AreaCode function', () => {
  it('should return area code for valid city', async () => {
    process.env.SHOWAPI_ACCESS_TOKEN = '4ea01a1902a63990fd507a1c4b470908'
    process.env.SHOWAPI_TOKEN_HEADER = 'showapi-access-token'
    const response = await AreaCode('杭州')
    expect(response?.ret_code).toBe(0)
    console.log(response?.list)
  })

  // it('should return error for invalid city', async () => {
  //   process.env.SHOWAPI_ACCESS_TOKEN = 'mock_token'
  //   const response = await AreaCode('InvalidCity')
  //   expect(response.status).toBe(500)
  //   const data = await response.json()
  //   expect(data).toEqual({ error: '获取景点列表出错' })
  // })

  // it('should handle showapi request errors', async () => {
  //   // 模拟 showapi 请求返回错误
  //   server.use(
  //     rest.post('https://116afb0c487e1514113b35f0395f895f.xapi.showapi.com/3-3', (req, res, ctx) => {
  //       return res(ctx.json({ showapi_res_code: 10001, showapi_res_error: 'Invalid token' }))
  //     })
  //   )

  //   process.env.SHOWAPI_ACCESS_TOKEN = 'mock_token'
  //   const response = await AreaCode('北京')
  //   expect(response.status).toBe(500)
  //   const data = await response.json()
  //   expect(data).toEqual({ error: '获取景点列表出错' })
  // })
})
