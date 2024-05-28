import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Link from 'next/link';
import { User } from '@/types';
import { useActiveUsersQuery } from '@/lib/features/active-users/active-users.api';

export default function ActiveUsers() {
    useActiveUsersQuery(undefined)
    const activeUsersSelector = useSelector((state: { activeUsers: User[] }) => state.activeUsers)

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
            {activeUsersSelector.map((activeUser, index) => (
                <ListItem key={index} disablePadding>
                    <ListItemButton
                        LinkComponent={Link}
                        href={``}
                    >
                        <ListItemText primary={activeUser.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}