"use client"
import { useState, useEffect } from "react"
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts'
import axios, { AxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from "@/schemas/signInSchema"
import * as z from 'zod'
import { useRouter } from "next/navigation"
import { ApiResponse } from "@/types/apiResponse"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { signIn } from "next-auth/react"



export default  function Page() {
  const [dataSent, setDataSent] = useState(false);
  const router = useRouter();
  

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password:''
    }
  });
  const onSubmit = async (data:z.infer<typeof signInSchema>) => {
    setDataSent(true);
    try {
        const res = await signIn('credentials', {
            redirect:false,
            identifier: data.identifier,
            password:data.password
        })
        if (res?.url) {
            toast.success('logged in successfully')
            router.replace('/dashboard')
        }
        else {
            toast.error(res?.error??'incorrect credentials')
        }
      
    } catch (error) {

      toast.error('error logging in')
    } finally {
      setDataSent(false)
    }

  }

  

  return (
      
    <div className='flex justify-center items-center'>
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            
            <Controller
              name="identifier"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldContent data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Email or Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. hello@hello.com or hello123"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldContent data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              )}
            />
            
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
    </div>
  )
}