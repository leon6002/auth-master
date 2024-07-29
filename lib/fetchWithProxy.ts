// // utils/fetchWithProxy.ts

// import { Agent } from "https"; // 如果你的代理使用 HTTPS，导入 Agent
// import { HttpsProxyAgent } from "https-proxy-agent";
// export async function fetchWithProxy(
//   url: RequestInfo | URL,
//   init?: RequestInit,
// ): Promise<Response> {
//   const proxyAgent = new HttpsProxyAgent("http://127.0.0.1:7890");

//   const response = await fetch(url, {
//     ...init,
//     agent: proxyAgent, // 使用自定义的 agent
//   });
//   return response;
// }
