import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Message } from "@/model/User"
export interface MessageProps{
    message: string,
    date:Date
}

export function MessageCard({message,date}:MessageProps) {
  return (
    <Card className="w-full max-w-sm shadow-sm">
      <CardHeader className="pb-2">
        <CardDescription>
          Sent at {date.toDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground wrap-break-word">
          {message}
        </p>
      </CardContent>
    </Card>
  )
}
