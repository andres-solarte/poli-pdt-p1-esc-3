import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Link from 'next/link';
import { useListRoomsQuery } from '@/lib/features/rooms/rooms.api';
import { User } from '@/types';
import { AuthState } from '@/lib/features/auth/auth.types';

type ActiveConversationProps = {
    selected?: boolean
    currentEmail: string
    room: {
        id: string
        users: User[]
    }
}

function ActiveConversation(props: ActiveConversationProps) {
    const user = props.room.users.find(user => user.email !== props.currentEmail)

    return (
        <ListItem disablePadding>
            <ListItemButton
                LinkComponent={Link}
                href={`/chat/${props.room.id}`}
                selected={props.selected}
            >
                <ListItemText primary={user?.name} />
            </ListItemButton>
        </ListItem>
    )
}

type ActiveConversationsProps = {
    currentRoomId: string
    email: string
}

export default function ActiveConversations(props: ActiveConversationsProps) {
    useListRoomsQuery(props.email)
    const authStateSelector = useSelector((state: { auth: AuthState }) => state.auth)
    const roomsSelector = useSelector((state: { rooms: any[] }) => state.rooms)

    return (
        <List
            component="nav"
            subheader={
                <ListSubheader
                    component="div"
                >
                    Conversaciones privadas
                </ListSubheader>
            }
        >
            {authStateSelector.user && roomsSelector.map((room, index) => (
                <ActiveConversation
                    key={index}
                    currentEmail={authStateSelector.user!.email}
                    room={room}
                    selected={room.id === props.currentRoomId}
                />
            ))}
        </List>
    )
}