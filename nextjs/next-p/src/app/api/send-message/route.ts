import { UserModel } from "@/model/User";
import { Message } from "@/model/User";
import dbConnect from "@/lib/dbConnect";


export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, content } = await request.json();
        const user = await UserModel.findOne({ username });
        if (!user) {
            return Response.json({
                success: false,
                message:'user not found '
            },{status:500})

        }
        if (!user.active) {
            return Response.json({
                success: false,
                message:'user is not accepting messages at this moment'
            },{status:500})
        }
        const newMessage = { content, createdAt: new Date() }
        user.messages.push(newMessage as Message);
        await user.save();
        return Response.json({
            success: true,
            message: 'message sent successfully'
        },{status:200})

    } catch (error) {
        console.log('internal server error', error)
        return Response.json({
            success: false,
            message:'internal server error'
        },{status:500})
    }
}