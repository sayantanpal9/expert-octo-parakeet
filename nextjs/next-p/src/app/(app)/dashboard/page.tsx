'use client'
import { MessageCard } from "@/components/messageCard";
import { Message } from "@/model/User";
import { ApiResponse } from "@/types/apiResponse";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounceCallback } from "usehooks-ts";

export default function Page() {
   const [messages, setMessages] = useState<Message[]>([]);
   const { data: session } = useSession();
   const user = session?.user;
   const debounce = useDebounceCallback(setMessages, 1000);
   useEffect(() => {
      async function hello(){
         try {
            const res = await axios.get('/api/get-message');
            console.log('get-message response', res.data);
            
            setMessages(res.data.messages??[] as Message[]);

         } catch(error) {
            let axiosErr = error as AxiosError<ApiResponse>;
            let errmsg = axiosErr.response?.data.message;
            console.log(axiosErr)
            toast.error(errmsg??'error');
         }
      }
      hello();
   }, [])
   return (
      <div>
         {messages.map((m, index) => (
            <MessageCard
               key={m._id?.toString() ?? index}
               message={m.content}
               date={(new Date(m.createdAt))}
            />
         ))}


      </div>
   )
}