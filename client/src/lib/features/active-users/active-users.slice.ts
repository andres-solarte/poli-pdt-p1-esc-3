import { createSlice } from '@reduxjs/toolkit'
import { User } from '@/types'

const initialState = [] as User[]

const activeUsersSlice = createSlice({
    name: 'activeUsers',
    initialState,
    reducers: {
        userJoined: (state, action) => {
            state = [
                ...state,
                action.payload
            ]

            return state
        },
        updateActiveUsers: (state, action) => {
            return action.payload
        }
    },
})

export const { userJoined, updateActiveUsers } = activeUsersSlice.actions
export default activeUsersSlice.reducer
