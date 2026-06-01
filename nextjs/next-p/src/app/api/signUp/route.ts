import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    dbConnect();
    try {
        const { username, email, password } = await request.json();
        const findByUsername = await UserModel.findOne({ username })
        const findByEmail = await UserModel.findOne({ email })
        if (findByUsername) {
            console.log('user with the same username already exists')
            return Response.json({
                success: false,
                message: 'user with same username already exists,try a different username'
            },
                {
                    status: 500
                }
            )
        }
        else if (findByEmail) {
            console.log('user with same email already exists')
            return Response.json({
                success: false,
                message: 'user with the same email already exists, try logging in'
            }, {
                status: 500
            })
        }

        const hash = await bcrypt.hash(password, 10);
        const verifyCode = (Math.floor(Math.random() * 8999)+1000).toString()
        const codeExpiry = new Date()
        codeExpiry.setHours(codeExpiry.getHours() + 1)
        const newUser = new UserModel({
            username,
            email,
            password: hash,
            verifyCode,
            codeExpiry,
            verified: false,
            active: true,
            messages: []
        })
        await newUser.save();
        const sendEmail = await sendVerificationEmail(email, verifyCode);
        if (sendEmail.success) {
            return Response.json({
                success: true,
                message:'verification code sent successfully'

            },{status:201})
        }
        else {
            return Response.json({success:false,message:'error sending verification email'},{status:500})
        }


    }
    catch (error) {
        console.error('error signing up',error)
        return Response.json({success:false,message:'error signing up'},{status:500})
    }
}