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

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { username: credentials.username },
                            { email: credentials.username }
                        ]
                    }
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
        async jwt({ token, user, trigger, session }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.role = user.email === 'weslley.uca@gmail.com' ? 'ADMIN' : user.role;
                token.status = user.status;
                token.educoins = user.educoins;
                token.level = user.level;
                token.xp = user.xp;
            }

            // Always fetch fresh data from DB to ensure role/status are up to date
            // This fixes the issue where an admin might be redirected to dashboard if session is stale
            if (token.id) {
                try {
                    const freshUser = await prisma.user.findUnique({
                        where: { id: token.id as string }
                    });

                    if (freshUser) {
                        token.role = freshUser.email === 'weslley.uca@gmail.com' ? 'ADMIN' : freshUser.role;
                        token.status = freshUser.status;
                        token.educoins = freshUser.educoins;
                        token.level = freshUser.level;
                        token.xp = freshUser.xp;
                    }
                } catch (error) {
                    console.error("Error refreshing user data in JWT callback:", error);
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                // @ts-ignore
                session.user.id = token.id;
                // @ts-ignore
                session.user.role = token.role;
                // @ts-ignore
                session.user.status = token.status;
                // @ts-ignore
                session.user.educoins = token.educoins;
                // @ts-ignore
                session.user.level = token.level;
                // @ts-ignore
                session.user.xp = token.xp;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
};
