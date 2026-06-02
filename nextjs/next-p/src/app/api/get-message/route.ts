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
        },{status : 500})
    }
    try {
        const userId = new mongoose.Types.ObjectId(session.user._id);
        const user = UserModel.aggregate([
            { $match: { id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt':- 1 }},
            {$group:{_id:'$_id',messages:{$push:'$messages'}}}
        ])

        if (!user) {
            return Response.json({
            success: false,
            message:'failed to get messages'
        },{status:500})
        }
        return Response.json({
            success: true,
            message: 'messages retrieved successfully',
            messages: user
        },{status:200})
        
    } catch (error) {
        console.log("failed to get messages", error)
        return Response.json({
            success: false,
            message:'failed to get messages'
        },{status:500})
    }



}