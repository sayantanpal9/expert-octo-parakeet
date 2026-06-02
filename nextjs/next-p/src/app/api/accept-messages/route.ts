import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { UserModel } from "@/model/User";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session||!session.user) {
        return Response.json({
            success: false,
            message:'no active session found'
        },{status : 500})
    }
    const user: User = session.user as User;
    try {
        const { status } = await request.json();
        const updatedUser = UserModel.findByIdAndUpdate(user._id, { active: status }, { new: true })
        if (!updatedUser) {
            return Response.json({
                success: false,
                message:'user not found'
            },{status:500})
        }
        return Response.json({
            success: true,
            message: 'active status updated successfully',
            updatedUser
        },{status:200})
    } catch (error) {
        console.log("failed to update active status", error)
        return Response.json({
            success: false,
            message:'failed to update active status'
        },{status:500})
    }



}