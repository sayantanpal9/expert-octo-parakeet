import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface User{
        _id?: string,
        username?: string,
        verified?: boolean,
        active?:boolean
    }
    interface JWT{
        _id?: string,
        username?: string,
        verified?: boolean,
        active?:boolean
    }
    interface Session{
        _id?: string,
        username?: string,
        verified?: boolean,
        active?:boolean
    }
}