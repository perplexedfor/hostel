import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Google from "next-auth/providers/google";
// import { Adapter } from "@next-auth/adapters";
// import { setName } from "@/src/lib/auth/setNameServerAction";
// import { clearStaleTokens } from "./clearStaleTokensServerAction";
import dotenv  from "dotenv"
dotenv.config();

export const { handlers , signIn, signOut, auth }  = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET, // Used to sign the session cookie so AuthJS can verify the session
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds (this value is also the default)
    },
    pages: {
      signIn: "/auth/sign-in",
      verifyRequest: "/auth/auth-success",
      error: "/auth/auth-error",
    },
    providers: [
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID || "",
          clientSecret:  process.env.GOOGLE_CLIENT_SECRET || "",
          allowDangerousEmailAccountLinking: true
        })
      ],
    callbacks:{
      async jwt({ token, user }) {
        // if (trigger === "update" && session?.name !== token.name) {
        //   token.name = session.name;
        //   try {
        //     await setName(token.name);
        //   } catch (error) {
        //     console.error("Failed to set user name:", error);
        //   }
        // }
  
        if (user) {
        //   await clearStaleTokens(); // Clear up any stale verification tokens from the database after a successful sign in
          return {
            ...token,
            id: user.id,
          };
        }
        return token;
      },
      async session({ session, token }) {
        console.log("session callback", { session, token });
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id as string,
          },
        };
      },
    },
})