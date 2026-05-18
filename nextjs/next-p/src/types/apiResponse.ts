import { Message } from "openai/resources/beta/threads.js";

export interface ApiResponse{
    success: boolean;
    message: string;
    messages?: Array<Message>;
    active?: boolean;
}