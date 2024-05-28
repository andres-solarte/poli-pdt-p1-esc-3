import { api } from '@/services/api'
import { socketConnection } from '@/utils/websocket'
import { userJoined, updateActiveUsers } from '@/lib/features/active-users/active-users.slice'
import { newMessage } from '@/lib/features/messages/messages.slice'

export const webSocketApi = api.injectEndpoints({
    endpoints: (builder) => ({
        webSocket: builder.query<void, undefined>({
            queryFn: async () => {
                return {
                    data: undefined
                }
            },
            onCacheEntryAdded: async (
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
            ) => {
                const socket = socketConnection()

                try {
                    await cacheDataLoaded

                    socket.on('userJoined', (data) => {
                        console.log('userJoined', data)
                        dispatch(userJoined(data))
                    })

                    socket.on('usersList', (data) => {
                        console.log('usersList', data)
                        dispatch(updateActiveUsers(data))
                    })

                    socket.on('newMessage', (data) => {
                        console.log('newMessage', data)
                        dispatch(newMessage(data))
                    })
                } catch (error) {
                    console.error(error)
                }

                await cacheEntryRemoved

                socket.close()
            },
        }),
    }),
})

export const {
    useWebSocketQuery
} = webSocketApi
