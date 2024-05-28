import { createSlice } from '@reduxjs/toolkit'
import { Message } from './messages.types'

const initialState = [] as Message[]

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        newMessage: (state, action) => {
            state = [
                ...state,
                action.payload
            ]

            return state
        },
        messages: (state, action) => {
            return action.payload
        }
    },
})

export const { messages, newMessage } = messagesSlice.actions
export default messagesSlice.reducer
