import NextAuth from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions{
    providers: [
        
    ]
}


