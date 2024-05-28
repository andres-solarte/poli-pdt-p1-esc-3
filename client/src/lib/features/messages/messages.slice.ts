import { createSlice } from '@reduxjs/toolkit'
import { Message } from './messages.types'

const initialState = {
    messages: [] as Message[],
}

const messagesSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        newMessage: (state, action) => {
            state.messages = [
                ...state.messages,
                action.payload
            ]
        }
    },
})

export const { newMessage } = messagesSlice.actions
export default messagesSlice.reducer
