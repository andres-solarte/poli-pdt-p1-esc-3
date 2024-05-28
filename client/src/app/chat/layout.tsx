'use client'

import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect } from "react";
import Divider from '@mui/material/Divider';
import { useSelector } from "react-redux";
import { AuthState } from "@/lib/features/auth/auth.types";
import { useLogoutMutation } from '@/lib/features/auth/auth.api'
import { useWebSocketQuery } from '@/lib/features/websocket/websocket.api'
import ActiveUsers from "./active-users";
import ActiveConversations from "./active-conversations";

const activeChats = [
    {
        name: 'John',
        email: 'john@mail.com'
    },
    {
        name: 'Emily',
        email: 'emily@mail.com'
    },
    {
        name: 'Michael',
        email: 'michael@mail.com'
    },
]

export default function Layout({ children }: Readonly<React.PropsWithChildren>) {
    useWebSocketQuery(undefined)
    const authStateSelector = useSelector((state: { auth: AuthState }) => state.auth)
    const [logout] = useLogoutMutation()
    const sideNavWidth = 300

    useEffect(() => {
        if (!authStateSelector?.isLoggedIn) {
            redirect('/login')
        }
    }, [authStateSelector])

    const handleLogoutButtonClick = async () => {
        if (authStateSelector.user)
            await logout(authStateSelector.user)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, width: '400px' }}>
                        {authStateSelector?.user?.name}
                    </Typography>
                    <Grid container justifyContent="flex-end">
                        <Button
                            size="large"
                            onClick={handleLogoutButtonClick}
                            color="inherit"
                        >
                            Salir
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Stack direction="row" spacing={2}>
                <Box
                    sx={{
                        width: `${sideNavWidth}px`,
                        bgcolor: 'background.paper',
                        borderRight: '1px solid #D9D9D9',
                    }}
                >
                    <List component="nav">
                        <ListItem disablePadding>
                            <ListItemButton
                                LinkComponent={Link}
                                selected
                                href={``}
                            >
                                <ListItemText primary={'Chat general'} />
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <Divider sx={{ mt: 2, mb: 2 }} />

                    {authStateSelector?.user && (
                        <ActiveConversations email={authStateSelector.user?.email} />
                    )}
                </Box>
                <Box
                    sx={{
                        width: `calc(100vw - ${sideNavWidth}px)`,
                    }}
                >
                    {children}
                </Box>
                <Box
                    sx={{
                        width: `${sideNavWidth}px`,
                        bgcolor: 'background.paper',
                        borderLeft: '1px solid #D9D9D9',
                    }}
                >
                    <ActiveUsers />
                </Box>
            </Stack>
        </Box>
    );
}
