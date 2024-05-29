import io, { Socket } from 'socket.io-client'
let currentConnection: Socket | null = null

export const socketConnection = () => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('API URL not found')
    }

    if (!currentConnection) {
        currentConnection = io(process.env.NEXT_PUBLIC_API_URL, {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000
        })
    }

    return currentConnection
}
