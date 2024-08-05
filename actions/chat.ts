export async function getToolCallResult(toolcallId: string) {
  if (!toolcallId) {
    console.log("toolcallId is null");
    return null;
  }
  console.log(`getToolCallResult from kv: ${toolcallId}`);
  const toolCallResult = await kv.hgetall<any>(`toolcall:${toolcallId}`);

  if (!toolCallResult) {
    console.log(`getToolCallResult result is null`);
    return null;
  }

  console.log(`getToolCallResult result is: ${toolCallResult}`);

  return toolCallResult;
}
