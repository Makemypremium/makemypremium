import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb-client";
import dbConnect from "@/lib/connection";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_URL,
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(_user, req) {
        await dbConnect();

        if (!_user.email || !_user.password) return null;

        try {
          const user = await User.findOne({ email: _user.email });

          if (!user) throw new Error("Invalid Credentials");

          if (!(await bcrypt.compare(_user.password, user.password)))
            throw new Error("Password does not match");

          const { password, ...userWithoutPassword } = user;

          return userWithoutPassword;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/signin",
    newUser: "/browse",
    error: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      if (token) session.user = token;

      return session;
    },
  },
};
