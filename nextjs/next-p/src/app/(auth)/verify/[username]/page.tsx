'use client'
import { verifySchema } from "@/schemas/verifySchema"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { Controller, useForm } from "react-hook-form"
import { useEffect } from "react"
import axios, { AxiosError } from "axios"
import { useParams,useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ApiResponse } from "@/types/apiResponse"



export default function Page() {
    const params = useParams<{ username: string }>();
    const route = useRouter();
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            verifyCode:''
        }
    })
    const onSubmit = async (data:z.infer<typeof verifySchema>) => {
        try {
            const res = await axios.post('/api/verify-code', {
                verifyCode:data.verifyCode,
                username:params.username

            })
            toast.success(res.data.message);
            route.replace('/signIn');

        } catch (error) {
          
            const ax = error as AxiosError<ApiResponse>
            toast.error(ax.response?.data.message ?? 'error verifying');
            
        }
    }


    return (
        <div className='flex justify-center items-center'>

        <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>User verification</CardTitle>
        <CardDescription>
          enter the four digit verification code we sent to your email to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="verifyCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldContent data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Enter your four digit verification code here 
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                  />
                </FieldContent>
              )}
            />
            
            
            
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
        </div>
    )
}