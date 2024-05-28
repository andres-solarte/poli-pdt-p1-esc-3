import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { User } from '@/types';
import { useActiveUsersQuery } from '@/lib/features/active-users/active-users.api';
import { AuthState } from '@/lib/features/auth/auth.types';
import { useCreateRoomMutation } from '@/lib/features/rooms/rooms.api';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'

type ActiveUsersProps = {
    email: string
}

export default function ActiveUsers(props: ActiveUsersProps) {
    useActiveUsersQuery(undefined)
    const authStateSelector = useSelector((state: { auth: AuthState }) => state.auth)
    const activeUsersSelector = useSelector((state: { activeUsers: User[] }) => state.activeUsers)
    const [createRoom, createRoomState] = useCreateRoomMutation()
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        if (createRoomState.isSuccess) {
            redirect(`/chat/${createRoomState.data.id}`)
        }
    }, [createRoomState])

    useEffect(() => {
        setUsers(
            activeUsersSelector
                .filter(user => user.email !== props.email)
        )
    }, [activeUsersSelector])

    const activeUserClick = (activeUser: User) => {
        if (authStateSelector.user?.email) {
            createRoom([
                authStateSelector.user.email,
                activeUser.email
            ])
        }
    }

    return (
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
            {users.map((activeUser, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton
                        onClick={() => activeUserClick(activeUser)}
                    >
                        <ListItemText primary={activeUser.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}