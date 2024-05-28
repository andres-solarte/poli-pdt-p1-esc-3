import { api } from '@/services/api'
import { Message, PostMessageDto } from './messages.types'
import { messages } from '@/lib/features/messages/messages.slice'

const messagesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query<Message[], { room: string }>({
            query: (query) => ({
                url: `messages/${query.room}`,
                method: 'GET',
            }),
            onCacheEntryAdded: async (
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
            ) => {
                try {
                    const response = await cacheDataLoaded

                    dispatch(messages(response.data))
                } catch (error) {
                    console.error(error)
                }
            }
        }),
        postMessage: builder.mutation<void, PostMessageDto>({
            query: (message) => ({
                url: 'messages',
                method: 'POST',
                body: message,
            }),
        }),
    }),
})

export const {
    useGetMessagesQuery,
    usePostMessageMutation
} = messagesApi
