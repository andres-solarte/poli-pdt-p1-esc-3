import _ from 'lodash';
import Box from '@mui/material/Box';
import ChatMessage from '@/components/chat-message';
import { useLazyGetMessagesQuery } from '@/lib/features/messages/messages.api';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Message } from '@/lib/features/messages/messages.types';
import { AuthState } from '@/lib/features/auth/auth.types';

type MessagesProps = {
    room: string
}

export default function Messages(props: MessagesProps) {
    const [getMessages, getMessagesStatus] = useLazyGetMessagesQuery()
    const scrollToBottomElementRef = useRef<HTMLDivElement>(null);
    const messagesSelector = useSelector((state: { messages: Message[] }) => state.messages)
    const authStateSelector = useSelector((state: { auth: AuthState }) => state.auth)
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        getMessages({ room: props.room })
            .then(() => { })
    }, [])

    useEffect(() => {
        setMessages(
            _.uniq(
                messagesSelector
                    .filter(message => message.to === props.room)
            )
        )
    }, [messagesSelector.length, props.room])

    useEffect(() => {
        if (scrollToBottomElementRef.current) {
            scrollToBottomElementRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }
    }, [messages.length])

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: 'auto'
        }}>

            {messages.map((message, index) => (
                <ChatMessage
                    key={index}
                    me={message.from.email === authStateSelector.user?.email}
                    {...message}
                />
            ))}

            <div ref={scrollToBottomElementRef} style={{ marginTop: '50px' }} />
        </Box>
    )
}