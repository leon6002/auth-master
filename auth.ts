import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type NextAuthOptions from "next-auth";
import getServerSession from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Gitee from "@/providers/gitee";
import Douyin from "@/providers/douyin";
import TikTok from "@/providers/tiktok";
import { NextRequest } from "next/server";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const config = (req: NextRequest | undefined): NextAuthConfig => {
  if (
    req?.method === "GET" &&
    req?.headers.get("referer")?.includes("douyin")
  ) {
    const url = new URL(req?.url);
    tkCode = url.searchParams.get("code") as string;
    tkCallback = url.pathname;
  }
  return {
    basePath: "/api/auth",
    trustHost: true,
    secret: process.env.AUTH_SECRET,
    callbacks: {
      async session({ token, session }) {
        // console.log({ sessionToken: token, session });
        if (token.sub && session.user) {
          session.user.id = token.sub;
        }
        if (token.role && session.user) {
          session.user.role = token.role as UserRole;
        }
        return session;
      },
      async jwt({ token }) {
        if (!token.sub) return token;
        const existingUser = await getUserById(token.sub);
        if (!existingUser) return token;
        token.role = existingUser.role;
        return token;
      },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    providers: [
      Douyin({
        clientId: process.env.DOUYIN_CLIENT_ID,
        clientSecret: process.env.DOUYIN_CLIENT_SECRET,
        token: {
          url: "https://open.douyin.com/oauth/access_token",
          async conform(response: Response) {
            const resData = await fetch(response.url, {
              method: "POST",
              headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                client_key: process.env.DOUYIN_CLIENT_ID!,
                client_secret: process.env.DOUYIN_CLIENT_SECRET!,
                code: tkCode!,
                grant_type: "authorization_code",
              }),
            }).then(async (res) => await res.json());
            // console.log({
            //   client_key: process.env.DOUYIN_CLIENT_ID!,
            //   client_secret: process.env.DOUYIN_CLIENT_SECRET!,
            //   code: tkCode!,
            //   grant_type: "authorization_code",
            // });

            const { data } = resData;
            data.token_type = "Bearer";
            // console.log("res data: ", data);
            const body = typeof data === "string" ? data : JSON.stringify(data);
            const newResponse: Response = new Response(body, {
              status: 200,
              headers: {
                "Content-Type": "application/json",
              },
            });
            return newResponse;
          },
        },
      }),
      Gitee({
        clientId: process.env.GITEE_CLIENT_ID,
        clientSecret: process.env.GITEE_CLIENT_SECRET,
      }),
      Github({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      Credentials({
        async authorize(credentials) {
          const validatedFields = LoginSchema.safeParse(credentials);
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const user = await getUserByEmail(email);
            if (!user || !user.password) {
              return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) return user;
          }
          return null;
        },
      }),
    ],
  };
};

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [GitHub],
// });
let tkCode: string | undefined;
let tkCallback: string | undefined;
export const { handlers, auth, signIn, signOut } = NextAuth(config);
