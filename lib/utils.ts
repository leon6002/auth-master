import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "谷流仓AI - AI文档对话",
  description = "谷流仓AI，有趣实用的AI工具箱 - AI文档对话、AI文本转换语音",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@joshtriedcoding",
    },
    icons,
    metadataBase: new URL("https://quill-jet.vercel.app"),
    themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function extractStreamBodyText(str: string) {
  const regex = /"(.*?)"/g;
  const matches = str.match(regex);
  const results = matches?.map((match) => match.slice(1, -1));
  return results ? results.join("") : "";
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>,
) => {
  fn();
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export enum ResultCode {
  InvalidCredentials = "INVALID_CREDENTIALS",
  InvalidSubmission = "INVALID_SUBMISSION",
  UserAlreadyExists = "USER_ALREADY_EXISTS",
  UnknownError = "UNKNOWN_ERROR",
  UserCreated = "USER_CREATED",
  UserLoggedIn = "USER_LOGGED_IN",
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return "Invalid credentials!";
    case ResultCode.InvalidSubmission:
      return "Invalid submission, please try again!";
    case ResultCode.UserAlreadyExists:
      return "User already exists, please log in!";
    case ResultCode.UserCreated:
      return "User created, welcome!";
    case ResultCode.UnknownError:
      return "Something went wrong, please try again!";
    case ResultCode.UserLoggedIn:
      return "Logged in!";
  }
};

export const formatDateAndCheckDay = (
  dateStr: string,
): {
  formattedDate: string;
  isToday: boolean;
  dayOfWeek: string;
  isWeekEnd: boolean;
  isYesterday: boolean;
} => {
  const year = parseInt(dateStr.slice(0, 4));
  const month = parseInt(dateStr.slice(4, 6));
  const day = parseInt(dateStr.slice(6, 8));

  const inputDate = new Date(year, month - 1, day); // 月份从 0 开始
  const today = new Date();

  const formattedDate = `${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  const isToday = inputDate.toDateString() === today.toDateString();
  const isWeekEnd = inputDate.getDay() === 0 || inputDate.getDay() === 6;

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1); // 昨天是今天的日期减去1

  const isYesterday = inputDate.toDateString() === yesterday.toDateString();

  const daysOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const dayOfWeek = daysOfWeek[inputDate.getDay()];

  return { formattedDate, isToday, dayOfWeek, isWeekEnd, isYesterday };
};

export function isDateBeforeToday(dateStr: string): boolean {
  const year = parseInt(dateStr.slice(0, 4));
  const month = parseInt(dateStr.slice(4, 6));
  const day = parseInt(dateStr.slice(6, 8));

  const inputDate = new Date(year, month - 1, day); // 月份从 0 开始
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return inputDate < today;
}

export function getFormattedDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
