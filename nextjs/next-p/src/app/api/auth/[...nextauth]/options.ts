import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import { User, UserModel } from "@/model/User";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions={
    
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any): Promise<any>{
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or:[{username:credentials.identifier},{email:credentials.identifier}]
                    })
                    if (!user) {
                        throw new Error('no user with such username or email exists,try registering')
                    }
                    if (!user.verified) {
                        throw new Error('pls verify your email first')
                    }
                    const passwordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (passwordCorrect) {
                        return user;
                    }
                    else {
                        throw new Error ('password does not match, pls try again')
                    }

                    

                } catch (error:any) {
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            token._id = user?._id?.toString();
            token.username = user?.username;
            token.verified = user?.verified;
            token.active = user?.active;
            return token;
        },
        async session({session,token}) {
            session.user._id = token._id?.toString();
            session.user.username = token.username;
            session.user.verified = token.verified;
            session.user.active = token.active;
            return session;
        }
    },
    pages: {
        signIn:'/signIn',
    },
    session: {
        strategy:'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    
}


