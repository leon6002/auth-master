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
