'use client'

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { redirect } from 'next/navigation';
import Container from "@mui/material/Container";
import { AuthState } from "@/lib/features/auth/auth.types";

export default function Layout({ children }: Readonly<React.PropsWithChildren>) {
    const authStateSelector = useSelector((state: { auth: AuthState }) => state.auth)

    useEffect(() => {
        if (authStateSelector?.isLoggedIn) {
            redirect('/chat')
        }
    }, [authStateSelector])

    return (
        <Container maxWidth='xl'>
            {children}
        </Container>
    );
}
