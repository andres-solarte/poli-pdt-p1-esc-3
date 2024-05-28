import { api } from '@/services/api'
import { AuthLoginDto } from './auth.types';
import { userLoggedIn, userLoggedOut } from './auth.slice'

export const authApi = api.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<any, AuthLoginDto>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled

                    localStorage.setItem(
                        'auth',
                        JSON.stringify(arg)
                    )

                    dispatch(userLoggedIn(arg))
                } catch (error) {
                    //Nothing to do
                }
            }
        }),
        logout: build.mutation<any, AuthLoginDto>({
            query: (body) => ({
                url: 'auth/logout',
                method: 'POST',
                body
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled

                    localStorage.removeItem('auth')

                    dispatch(userLoggedOut())
                } catch (error) {
                    //Nothing to do
                }
            }
        })
    }),
});


export const {
    useLoginMutation,
    useLogoutMutation
} = authApi;
