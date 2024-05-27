import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import React from "react";
import moment from "moment";

type MessageRightProps = {
    email: string;
    name: string;
    message: string;
    timestamp: number;
}

export default function MessageRight(props: MessageRightProps) {
    return (
        <Box
            sx={{
                alignItems: "start",
                display: "flex",
                flexDirection: "row-reverse",
                gap: 1,
                padding: 1,
            }}
        >
            <Avatar src="/ChatAiAvatar.svg" />

            <Box
                sx={{
                    borderRadius: "10px 10px 0 10px",
                    border: "1px solid #E0E0E0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 1.5,
                    maxWidth: "60%",
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        width: "100%",
                    }}
                >
                    {props.name}

                    <Typography component={"span"} fontSize={"small"}>
                        {moment(props.timestamp).fromNow()}
                    </Typography>
                </Typography>

                {props.message}

            </Box>
        </Box>
    )
}