import io from 'socket.io-client'

export const socketConnection = () => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('API URL not found')
    }

    return io(process.env.NEXT_PUBLIC_API_URL)
}
