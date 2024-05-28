import { api } from '@/services/api'
import { updateRooms } from './rooms.slice'

export const roomsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createRoom: builder.mutation<void, string[]>({
            query: (users: string[]) => ({
                url: '/rooms',
                method: 'POST',
                body: { users }
            }),
        }),
        listRooms: builder.query<void, string>({
            query: (email: string) => ({
                url: '/rooms/' + email,
                method: 'GET',
            }),
            onCacheEntryAdded: async (
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
            ) => {
                try {
                    const response = await cacheDataLoaded

                    dispatch(updateRooms(response.data))
                } catch (error) {
                    console.error(error)
                }
            },
        }),
    }),
})

export const {
    useListRoomsQuery,
    useCreateRoomMutation
} = roomsApi
