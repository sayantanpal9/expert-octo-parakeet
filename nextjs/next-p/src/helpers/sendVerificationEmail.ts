import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/apiResponse";



export async function sendVerificationEmail(
    email: string,
    verifyCode:string
): Promise<ApiResponse>{
    try {

        const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'verification code',
      react: VerificationEmail({email,verifyCode}),
        });
        console.log(data)
        return {success:true,message:'verification email is sent successfully'}
    }
    catch (error) {
        console.error('error  sending verification email', error);
        return {success:false,message:'verification email is not sent'}
    }
}