'use client'

import React from "react";
import Container from "@mui/material/Container";

export default function Layout({ children }: Readonly<React.PropsWithChildren>) {
    return (
        <Container maxWidth='xl'>
            {children}
        </Container>
    );
}
