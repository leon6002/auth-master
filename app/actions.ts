"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

// import { kv } from "@vercel/kv";

import { auth } from "@/auth";
import {
  ChatMessageCore,
  matchChatRole,
  Message,
  type Chat,
} from "@/lib/types";
import { ChatContentType, ChatMessages, ChatRole } from "@prisma/client";
import { use } from "react";
import { DEFAULT_AGENT_PATH } from "@/routes";

export async function getChats(userId?: string | null) {
  if (!userId) {
    return [];
  }

  try {
    const chatIds = await db.chat.findMany({
      where: { userId: userId, deleted: false },
      select: { id: true },
    });
    console.log(chatIds);
    console.log("userId: ", userId);
    const chatList: any[] = [];

    if (!chatIds) {
      return chatList;
    }
    for (const chat of chatIds) {
      const chatRes = await getChat(chat.id, userId);
      chatList.push(chatRes);
    }
    // console.log("chatList is :", JSON.stringify(chatList));
    return chatList as Chat[];
  } catch (error) {
    return [];
  }
}

export async function getChat(id: string, userId?: string) {
  const chat = await db.chat.findUnique({
    where: { id: id, deleted: false },
  });
  // console.log("getChat chat is: ", JSON.stringify(chat));

  if (!chat) {
    return null;
  }

  const messagesInDb = await db.chatMessages.findMany({
    where: { chatId: id, deleted: false },
    select: { messageId: true, role: true, type: true },
  });
  let messages: any[];
  if (messagesInDb) {
    const contents = await db.textContent.findMany({
      where: { id: { in: messagesInDb.map((msg) => msg.messageId) } },
    });
    messages = messagesInDb.map((msg) => {
      const contentResult = contents.find((c) => c.id === msg.messageId);
      const content = contentResult?.content || "";
      return {
        id: msg.messageId,
        role: matchChatRole(msg.role).toLowerCase(),
        content:
          msg.type === ChatContentType.TEXT
            ? content
            : JSON.parse(content ? content : "{}"),
      };
    });
  } else {
    messages = [];
  }

  const chatResult: any = {
    id: chat.id,
    title: chat.title,
    createdAt: chat.createdAt,
    userId: chat.userId,
    path: chat.path || "/",
    messages: messages,
    sharePath: chat.sharePath,
  };
  console.log();

  return chatResult;
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }
  const chatCount = await db.chat.count({
    where: { id: id, userId: session.user.id, deleted: false },
  });
  if (chatCount) {
    await db.chat.update({
      where: { id: id },
      data: { deletedAt: new Date(), deleted: true },
    });
  }
  console.log("app/actions.ts removeChat 113 path:", path);
  return revalidatePath(path);
}

export async function clearChats() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  // check if user has any chats not deleted
  const chatIds = await db.chat.findMany({
    where: { userId: userId, deleted: false },
    select: { id: true },
  });
  if (!chatIds) {
    return redirect(DEFAULT_AGENT_PATH);
  }
  // only update those not deleted
  await db.chat.updateMany({
    where: { id: { in: chatIds.map((chatIds) => chatIds.id) } },
    data: { deletedAt: new Date(), deleted: true },
  });

  return redirect(DEFAULT_AGENT_PATH);
}

export async function getSharedChat(id: string) {
  const chat = await getChat(id);
  if (!chat || !chat.sharePath) {
    return null;
  }
  return chat;
}

export async function shareChat(id: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const chat = await getChat(id, userId);

  if (!chat || chat.userId !== session.user.id) {
    return {
      error: "Something went wrong",
    };
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`,
  };
  //todo save to db?
  // await kv.hmset(`chat:${chat.id}`, payload);

  return payload;
}

async function createChatAndMessages(chat: Chat, userId: string) {
  await db.chat.create({
    data: {
      id: chat.id,
      title: chat.title,
      createdAt: chat.createdAt,
      userId: userId,
      path: `${DEFAULT_AGENT_PATH}/chat/${chat.id}`,
      sharePath: chat.sharePath,
    },
  });
  batchCreateMessage(chat.messages, chat.id);
}

async function batchCreateMessage(messages: Message[], chatId: string) {
  if (!messages) {
    return;
  }

  const chatMessagesToCreate = messages.map((msg): ChatMessageCore => {
    let type;
    if (typeof msg.content === "string") {
      type = ChatContentType.TEXT;
    } else {
      if (msg.role === "user") {
        type = ChatContentType.JSON;
      } else if (msg.role === "tool") {
        type = ChatContentType.TOOLRESULT;
      } else {
        type = ChatContentType.TOOLCALL;
      }
    }

    return {
      messageId: msg.id,
      chatId: chatId,
      role: matchChatRole(msg.role),
      type: type,
      content:
        type === ChatContentType.TEXT
          ? msg.content
          : JSON.stringify(msg.content),
    };
  });

  await db.chatMessages.createMany({
    data: chatMessagesToCreate.map((msg) => ({
      messageId: msg.messageId,
      chatId: msg.chatId,
      role: msg.role,
      type: msg.type,
    })),
  });
  await db.textContent.createMany({
    data: chatMessagesToCreate.map((msg) => ({
      id: msg.messageId,
      content: msg.content as string,
    })),
  });
}
export async function saveChat(chat: Chat) {
  const session = await auth();

  if (session && session.user) {
    const userId = session.user.id;

    //find chat reord in db
    const chatRecord = await db.chat.findUnique({
      where: { id: chat.id },
    });

    //if chat record is not found, create a new chat record
    if (!chatRecord) {
      createChatAndMessages(chat, userId);
      return;
    }

    //if chat record is found, update the chat record
    //1. update chat title
    await db.chat.update({
      where: { id: chat.id },
      data: { title: chat.title },
    });
    //2. find messages in db
    const messagesIdsIndb = await db.chatMessages.findMany({
      where: { chatId: chat.id },
      select: { messageId: true },
    });
    //3. msgs in db but not in incoming chat, soft delete them
    const messagesIdsToDelete = messagesIdsIndb.filter(
      (msg) => !chat.messages.find((m) => m.id === msg.messageId),
    );
    if (messagesIdsToDelete) {
      await db.chatMessages.updateMany({
        where: { chatId: { in: messagesIdsToDelete.map((m) => m.messageId) } },
        data: { deletedAt: new Date(), deleted: true },
      });
    }
    //4. msgs in incoming chat but not in db, insert them
    const messagesToInsert = chat.messages.filter(
      (msg) => !messagesIdsIndb.find((m) => m.messageId === msg.id),
    );
    await batchCreateMessage(messagesToInsert, chat.id);
  } else {
    return;
  }
}

export async function refreshHistory(path: string) {
  redirect(path);
}

export async function getMissingKeys() {
  const keysRequired = ["OPENAI_API_KEY"];
  return keysRequired
    .map((key) => (process.env[key] ? "" : key))
    .filter((key) => key !== "");
}
