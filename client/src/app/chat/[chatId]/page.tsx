'use client'

import { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import ChatMessage from '@/components/chat-message';
import { usePostMessageMutation, useGetMessagesQuery } from '@/lib/features/messages/messages.api'
import { Message, PostMessageDto } from '@/lib/features/messages/messages.types';
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import { AuthState } from '@/lib/features/auth/auth.types';

type PageProps = {
    params: {
        chatId: string
    }
}

const defaultValues = {
    message: '',
}

export default function Page(props: PageProps) {
    const scrollToBottomElementRef = useRef<HTMLDivElement>(null);
    useGetMessagesQuery({ room: props.params.chatId })
    const authStateSelector = useSelector((state: { auth: AuthState }) => state.auth)
    const messagesSelector = useSelector((state: { messages: Message[] }) => state.messages)
    const [postMessage, postMessageStatus] = usePostMessageMutation()
    const { register, handleSubmit, formState, reset } = useForm({ defaultValues });
    const { errors } = formState
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        if (scrollToBottomElementRef.current) {
            scrollToBottomElementRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }

        setMessages(
            messagesSelector
                .filter(message => message.to === props.params.chatId)
        )
    }, [messagesSelector.length])

    const onSubmit = async (data: typeof defaultValues) => {

        if (!authStateSelector?.user) return

        const payload: PostMessageDto = {
            ...data,
            from: authStateSelector.user.email,
            to: props.params.chatId
        }

        await postMessage(payload)

        reset()
    }

    return (
        <Container maxWidth="md" sx={{
            height: 'calc(100vh - 70px)',
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: '24px 24px'
        }}>

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

                <div ref={scrollToBottomElementRef} />
            </Box>

            <TextField
                fullWidth
                {...register('message', {
                    required: 'Debes ingresar un mensaje'
                })}
                label="Escribe tu mensaje aquí"
                disabled={postMessageStatus.isLoading}
                error={!!errors.message}
                helperText={errors.message?.message}
                maxRows={4}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton edge="end" color="primary" onClick={handleSubmit(onSubmit)}>
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Container>
    )
}