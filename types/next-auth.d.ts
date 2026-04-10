import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            status: string;
            educoins: number;
            level: number;
            xp: number;
        } & DefaultSession["user"];
    }

    interface User {
        role: string;
        status: string;
        educoins: number;
        level: number;
        xp: number;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
        status: string;
        educoins: number;
        level: number;
        xp: number;
    }
}
