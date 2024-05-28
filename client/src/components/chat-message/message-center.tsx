import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import moment from "moment";

type MessageCenterProps = {
    from: {
        email: string;
        name: string;
    },
    message: string;
    timestamp: number;
}

export default function MessageCenter(props: MessageCenterProps) {
    return (
        <Box
            sx={{
                alignItems: "start",
                display: "flex",
                gap: 1,
                padding: 1,
            }}
        >

            <Box
                sx={{
                    borderRadius: "10px 10px 10px 0",
                    border: "1px solid #E0E0E0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 1.5,
                    minWidth: "30%",
                    maxWidth: "60%",
                }}
            >
                <Typography
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        fontWeight: 600,
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    {props.from.name}
                    <Typography component={"span"} fontSize={"small"}>
                        {moment(props.timestamp).fromNow()}
                    </Typography>
                </Typography>

                {props.message}

            </Box>
        </Box>
    )
}