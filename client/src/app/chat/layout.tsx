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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from "react";
import Divider from '@mui/material/Divider';

const activeUsers = [
    {
        name: 'Jose',
        email: 'j@mail.com',
    },
    {
        name: 'Adriana',
        email: 'a@mail.com'
    },
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
    {
        name: 'Sophia',
        email: 'sophia@mail.com'
    }
]

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
    const router = useRouter()
    const sideNavWidth = 300

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container justifyContent="flex-end">
                        <Button
                            size="large"
                            onClick={() => router.push('/login')}
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

                    <List
                        component="nav"
                        subheader={
                            <ListSubheader
                                component="div"
                            >
                                Conversaciones activas
                            </ListSubheader>
                        }
                    >

                        {activeChats.map((chat, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    LinkComponent={Link}
                                    href={``}
                                >
                                    <ListItemText primary={chat.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
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
                    <List
                        component="nav"
                        subheader={
                            <ListSubheader
                                component="div"
                            >
                                Usuarios activos
                            </ListSubheader>
                        }
                    >

                        {activeUsers.map((chat, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    LinkComponent={Link}
                                    href={``}
                                >
                                    <ListItemText primary={chat.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Stack>
        </Box>
    );
}
