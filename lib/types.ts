import { ChatContentType, ChatRole } from "@prisma/client";
import { CoreMessage } from "ai";

export type Message = CoreMessage & {
  id: string;
};

export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: Message[];
  sharePath?: string;
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;

export interface Session {
  user: {
    id: string;
    email: string;
  };
}

export interface AuthResult {
  type: string;
  message: string;
}

export interface User extends Record<string, any> {
  id: string;
  email: string;
  password: string;
  salt: string;
}

export function matchChatRole(str: string): ChatRole {
  switch (str.toLowerCase()) {
    case "user":
      return ChatRole.USER;
    case "assistant":
      return ChatRole.ASSISTANT;
    case "tool":
      return ChatRole.TOOL;
    default:
      return ChatRole.USER;
  }
}

export interface ChatMessageCore {
  messageId: string;
  chatId: string;
  role: ChatRole;
  type: ChatContentType;
  content: Message["content"];
}
