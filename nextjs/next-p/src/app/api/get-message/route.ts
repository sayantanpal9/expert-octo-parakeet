import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { UserModel } from "@/model/User";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";


export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session||!session.user) {
        return Response.json({
            success: false,
            message:'no active session found'
        },{status : 503})
    }
    try {
        const userEmail = (session.user.email) as string;
        const userName = (session.user.username);
        const userid = new mongoose.Types.ObjectId(session.user._id as string);
        const users = await UserModel.aggregate([
            { $match: { $or:[{email:userEmail},{username:userName},{_id:userid}] } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]);
        const user = UserModel.findOne({
            username:'fsdkfjk'
        })
        const messages = users[0]?.messages ?? [];
        console.log('hello',session)
        return Response.json({
            success: true,
            message: 'messages retrieved successfully',
            messages,
        }, { status: 200 });
        
    } catch (error) {
        console.log("failed to get messages", error)
        return Response.json({
            success: false,
            message:'failed to get messages'
        },{status:501})
    }



}