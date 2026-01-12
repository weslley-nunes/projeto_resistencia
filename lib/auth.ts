import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                // @ts-ignore
                session.user.id = user.id;
                // @ts-ignore
                session.user.role = user.role;
                // @ts-ignore
                session.user.status = user.status;
                // @ts-ignore
                session.user.educoins = user.educoins;
                // @ts-ignore
                session.user.level = user.level;
                // @ts-ignore
                session.user.xp = user.xp;
            }
            return session;
        },
    },
    pages: {
        signIn: '/',
    },
};
