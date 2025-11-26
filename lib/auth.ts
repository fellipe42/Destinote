import { PrismaAdapter } from "@next-auth/prisma-adapter"; // ou "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session as any).user.id = (token as any).id;
        (session as any).user.role = (token as any).role ?? null;
      }
      return session;
    },
  },
};
