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
                        height: '100vh',
                        width: `${sideNavWidth}px`,
                        bgcolor: 'background.paper',
                        borderRight: '1px solid #D9D9D9',
                    }}
                >
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
                        <ListItem disablePadding>
                            <ListItemButton
                                LinkComponent={Link}
                                selected
                                href={``}
                            >
                                <ListItemText primary={'General'} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                LinkComponent={Link}
                                href={``}
                            >
                                <ListItemText primary={'Jose'} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                LinkComponent={Link}
                                href={``}
                            >
                                <ListItemText primary={'Adriana'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
                <Box
                    sx={{
                        width: `calc(100vw - ${sideNavWidth}px)`,
                        height: `calc(100vh)`
                    }}
                >
                    {children}
                </Box>
            </Stack>
        </Box>
    );
}
