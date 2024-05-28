import { createSlice } from '@reduxjs/toolkit'
import { AuthState } from './auth.types'

const initialState: AuthState = {
    user: undefined,
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true
        },
        userLoggedOut: (state) => {
            state.user = undefined
            state.isLoggedIn = false
        },
    },
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions
export default authSlice.reducer
