import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import React from "react";
import moment from "moment";
import Stack from "@mui/material/Stack";

type MessageLeftProps = {
    from: {
        email: string;
        name: string;
    },
    to: string;
    message: string;
    timestamp: number;
}

export default function MessageLeft(props: MessageLeftProps) {
    return (
        <Box
            sx={{
                alignItems: "start",
                display: "flex",
                gap: 1,
                padding: 1,
            }}
        >
            <Avatar />

            <Box
                sx={{
                    borderRadius: "10px 10px 10px 0",
                    border: "1px solid #E0E0E0",
                    padding: 1.5,
                    minWidth: "40%",
                    maxWidth: "75%",
                }}
            >
                <Stack direction="column" spacing={1}>
                    <Stack direction="row" spacing={1} justifyContent={'space-between'}>
                        <Typography>
                            {props.from.name}
                        </Typography>

                        <Typography component={"span"} fontSize={"small"}>
                            {moment(props.timestamp).fromNow()}
                        </Typography>
                    </Stack>

                    <Typography>
                        {props.to}
                    </Typography>

                    <Typography component={"span"}>
                        {props.message}
                    </Typography>
                </Stack>

            </Box>
        </Box>
    )
}