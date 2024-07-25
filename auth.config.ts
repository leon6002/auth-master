import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./data/user";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Gitee from "@/providers/gitee";
import Douyin from "@/providers/douyin";
export default {
  providers: [
    Douyin({
      clientKey: process.env.DOUYIN_CLIENT_ID,
      clientSecret: process.env.DOUYIN_CLIENT_SECRET,
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
} satisfies NextAuthConfig;
