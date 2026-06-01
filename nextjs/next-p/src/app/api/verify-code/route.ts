import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { verifySchema } from "@/schemas/verifySchema";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const {username, verifyCode } = await request.json();
        const user = await UserModel.findOne({
            username
        });
        if (verifySchema.safeParse({ verifyCode })&&user && user.verifyCode == verifyCode&&user.verified==false) {
            user.verified = true;
            user.save();
            return Response.json({
                success: true,
                message:'user verified successfully'
            },{status:200})
        }
        else if (!verifySchema.safeParse({ verifyCode })||(user&&user.verifyCode!=verifyCode)) {
            return Response.json({
                success: false,
                message:'invalid verify code'
            },{status:500})
        }
        else {
            return Response.json({
                success: false,
                message:'error verifying user'
            },{status:500})
            
        }
        
        



    }
    catch(err) {
        console.error('error validating code', err)
        return Response.json({
            success: false,
            message:'error validating code'
        },{status:500})

    }
}