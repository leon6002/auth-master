import { db } from "@/lib/db";

export async function getToolCallResult(toolCallId: string) {
  if (!toolCallId) {
    console.log("toolcallId is null");
    return null;
  }
  console.log(`getToolCallResult from kv: ${toolCallId}`);
  const toolCallResult = await db.toolCallContent.findFirst({
    where: { toolCallId },
    select: { result: true },
  });

  if (!toolCallResult) {
    console.log(`getToolCallResult result is null`);
    return null;
  }

  console.log(`getToolCallResult result is: ${toolCallResult}`);

  return JSON.parse(toolCallResult.result);
}

export async function saveToolCallResult(
  toolCallId: string,
  name: string,
  args: string,
  result: string,
) {
  if (!toolCallId) {
    console.log("toolcallId is null");
    return null;
  }
  console.log(`getToolCallResult from kv: ${toolCallId}`);
  await db.toolCallContent.create({
    data: {
      toolCallId,
      name,
      args,
      result,
    },
  });
}

export async function saveApiResponse(
  id: string,
  name: string,
  params: string,
  result: string,
) {
  if (!id) {
    console.log("toolcallId is null");
    return null;
  }
  await db.cachedApiResponse.create({
    data: {
      id,
      name,
      params: JSON.parse(params),
    },
  });
  // 将结果存储在textContent表，这样当查询的时候，先通过name和param查找到id，
  // 在到这个表直接通过id查找结果，这样在result数量大的时候查起来快一些
  await db.textContent.create({
    data: {
      id,
      content: result,
    },
  });
}

export async function SearchCachedApiResponse(
  apiName: string,
  apiParams: string,
) {
  if (!apiName) {
    console.log("toolcallId is null");
    return null;
  }
  const apiCallId = await db.cachedApiResponse.findFirst({
    where: { name: apiName, params: { equals: JSON.parse(apiParams) } },
    select: { id: true },
  });
  if (!apiCallId) return null;

  const result = await db.textContent.findUnique({
    where: { id: apiCallId.id },
    select: { content: true },
  });
  if (!result) return null;

  return JSON.parse(result.content);
}
