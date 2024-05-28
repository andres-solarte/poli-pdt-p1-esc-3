import { User } from "@/types";

export type Message = {
    room: string;
    from: User;
    to: string; // email or "general"
    message: string;
    timestamp: number;
}

export type PostMessageDto = {
    from: string;
    to: string;
    message: string;
}