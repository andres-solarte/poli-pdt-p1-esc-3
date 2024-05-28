import React from "react";
import MessageRight from "./message-right";
import MessageLeft from "./message-left";
import MessageCenter from "./message-center";


type ChatMessageProps = {
    from: {
        email: string;
        name: string;
    },
    message: string;
    timestamp: number;
    me: boolean
}

export default function ChatMessage(props: ChatMessageProps) {
    if (props.from.email === 'server@email.com')
        return <MessageCenter {...props} />
    else if (props.me)
        return <MessageRight {...props}/>
    else if (!props.me)
        return <MessageLeft {...props} />
}