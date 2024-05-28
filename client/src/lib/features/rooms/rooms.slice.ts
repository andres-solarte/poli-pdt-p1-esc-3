import { createSlice } from '@reduxjs/toolkit'
import { User } from '@/types'

const initialState = [] as User[]

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        newRoom: (state, action) => {
            state = [
                ...state,
                action.payload
            ]

            return state
        },
        updateRooms: (state, action) => {
            return action.payload
        }
    },
})

export const { newRoom, updateRooms } = roomsSlice.actions
export default roomsSlice.reducer
