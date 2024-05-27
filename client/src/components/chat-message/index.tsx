import React from "react";
import MessageRight from "./message-right";
import MessageLeft from "./message-left";


type ChatMessageProps = {
    email: string;
    name: string;
    message: string;
    timestamp: number;
    me: boolean
}

export default function ChatMessage(props: ChatMessageProps) {
    return props.me ? <MessageRight {...props} name="" /> : <MessageLeft {...props} />
}