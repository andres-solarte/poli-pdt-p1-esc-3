import { api } from '@/services/api'
import { updateActiveUsers } from './active-users.slice'

export const activeUsersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        activeUsers: builder.query<void, undefined>({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            onCacheEntryAdded: async (
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
            ) => {
                try {
                    const response = await cacheDataLoaded

                    dispatch(updateActiveUsers(response.data))
                } catch (error) {
                    console.error(error)
                }
            }
        }),
    }),
})

export const {
    useActiveUsersQuery
} = activeUsersApi