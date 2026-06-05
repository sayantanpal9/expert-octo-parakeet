'use client'
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";


export default function Navbar() {
    const {data:session} = useSession()
    const user: User = session?.user as User;
    return(
      <header className="flex items-center justify-between w-full h-16 px-6 bg-white shadow-sm">
        <div className="text-lg font-semibold tracking-tight text-slate-900">
          octo
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <Button onClick={() => void signOut({ callbackUrl: '/signIn' })}>
              Log out
            </Button>
          ) : (
            <a href="/signIn">
              <Button>Sign in</Button>
            </a>
          )}
        </div>
      </header>
    );
}