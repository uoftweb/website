import * as dotenv from "dotenv";
dotenv.config();

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  callbacks: {
    async session(session, token) {
      // expose user id
      return Promise.resolve({
        ...session,
        user: { ...session.user, id: token.id },
      });
    },
  },
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error", // Error code passed in query string as ?error=
  //   verifyRequest: "/auth/verify-request", // (used for check email message)
  //   newUser: null, // If set, new users will be directed here on first sign in
  // },
};

export default (req, res) => NextAuth(req, res, options);
