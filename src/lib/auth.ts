import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { database } from "./database";
import GoogleProvider from "next-auth/providers/google";

interface GoogleCredetnialsOptions {
  clientId: string;
  clientSecret: string;
}

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(database),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const appUser = (await database.get(`user:${token.id}`)) as User | null;

      if (!appUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: appUser.id,
        name: appUser.name,
        email: appUser.email,
        image: appUser.image,
      };
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }

      return session;
    },
    redirect() {
      return "/dashboard";
    },
  },
};

function getGoogleCredentials(): GoogleCredetnialsOptions {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0)
    throw new Error("Missing Google Client ID");

  if (!clientSecret || clientSecret.length === 0)
    throw new Error("Missing Google Client Secret");

  return { clientId, clientSecret };
}
