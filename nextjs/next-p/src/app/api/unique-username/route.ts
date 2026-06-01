import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { verifyUsername } from "@/schemas/signUpSchema";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, password } = await request.json();
        const usernameSchema = z.object({
            username:verifyUsername
        })
        const user = await UserModel.findOne({
            username
        });
        if (usernameSchema.safeParse({ username }).success && !user) {
            return Response.json({
                success: true,
                message:'Username is unique and available to take'
            },{status:200})
        }
        else if (!usernameSchema.safeParse({ username }).success) {
            return Response.json({
                success: false,
                message:'Invalid username'
            },{status:500})
        }
        else {
            return Response.json({
                success: false,
                message:'Username already taken'
            },{status:500})
        }



    }
    catch(err) {
        console.error('error validating username', err)
        return Response.json({
            success: false,
            message:'error validating username'
        },{status:500})

    }
}