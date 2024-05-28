import { User } from "@/types";

export type Message = {
    from: User;
    to: string; // email or "general"
    message: string;
    timestamp: number;
}