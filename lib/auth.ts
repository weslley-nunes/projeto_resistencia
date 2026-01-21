import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { username: credentials.username }
                });

                if (!user || !user.password) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) return null;

                return user;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                // @ts-ignore
                session.user.id = user.id;
                // @ts-ignore
                // Hardcode Admin for specific email
                if (session.user.email === 'weslley.uca@gmail.com') {
                    session.user.role = 'ADMIN';
                } else {
                    session.user.role = user.role;
                }
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
