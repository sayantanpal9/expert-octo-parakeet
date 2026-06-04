"use client"
import { useState, useEffect } from "react"
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts'
import axios, { AxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from "@/schemas/signUpSchema"
import * as z from 'zod'
import { useRouter } from "next/navigation"
import { ApiResponse } from "@/types/apiResponse"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"



export default  function Page() {
  const [username, setUsername] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [isOK, setIsOK] = useState(false);
  const [dataSent, setDataSent] = useState(false);
  const debounce = useDebounceCallback(setUsername, 300);
  const router = useRouter();
  

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password:''
    }
  });
  const onSubmit = async (data:z.infer<typeof signUpSchema>) => {
    setDataSent(true);
    try {
      const res = await axios.post('/api/signUp', data);
      router.replace(`/verify/${username}`)
      
    } catch (error) {
      console.error('error submitting', error)
      let axiosErr = error as AxiosError<ApiResponse>;
      let errmsg = axiosErr.response?.data.message;
    } finally {
      setDataSent(false)
    }

  }
  useEffect(() => {
    async function hello(){
      if (username) {
        setIsLoad(true);
        try {
          const res = await axios.post('/api/unique-username', { username });
          console.log(res)
          setIsOK(true)
          setUserMessage(res.data.message)

        }
        catch (error) {
          setIsOK(false)
          let axiosErr = error as AxiosError<ApiResponse>;
          let errmsg = axiosErr.response?.data.message;
          setUserMessage(errmsg??'error')
        }
        finally {
          setIsLoad(false);
        }
      }
      else {
        setUserMessage('');
        setIsOK(false)

      }
    }
    hello();
  }, [username])

  

  return(
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Bug Report</CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldContent data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="username must be atleast 5 characters in length"
                    autoComplete="off"
                    onChange={e=>{
                      debounce(e.target.value)
                      field.onChange(e)
                    }}
                  />
                  <p className={`${isOK?'text-green-500':'text-red-500'}`}>{userMessage}</p>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldContent data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="eg. hello@hello.com"
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
  )
}