'use client'

import { useRef } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import ChatMessage from '@/components/chat-message';

const me = {
    email: 'user1@mail.com',
    name: 'User 1'
}

const messages = [
    {
        email: 'user1@mail.com',
        name: 'User 1',
        message: 'Hello!',
        timestamp: Date.now(),
    },
    {
        email: 'user2@mail.com',
        name: 'User 2',
        message: 'Hi there!',
        timestamp: Date.now(),
    },
    {
        email: 'user1@mail.com',
        name: 'User 1',
        message: 'Hey everyone!',
        timestamp: Date.now(),
    },
    {
        email: 'user4@mail.com',
        name: 'User 4',
        message: 'Greetings!',
        timestamp: Date.now(),
    },
    {
        email: 'user5@mail.com',
        name: 'User 5',
        message: 'Good day!',
        timestamp: Date.now(),
    },
];

export default function Page() {
    const scrollToBottomElementRef = useRef<HTMLDivElement>(null);

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
                        me={message.email === me.email}
                        {...message}
                    />
                ))}

                <div ref={scrollToBottomElementRef} />
            </Box>

            <TextField
                fullWidth
                label="Escribe tu mensaje aquí"
                maxRows={4}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton edge="end" color="primary" onClick={() => { }}>
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Container>
    )
}