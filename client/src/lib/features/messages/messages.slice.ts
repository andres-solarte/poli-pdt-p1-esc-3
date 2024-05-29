import { createSlice } from '@reduxjs/toolkit'
import { Message } from './messages.types'
import messagesApi from './messages.api'

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
        messages: (_state, action) => {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            messagesApi.endpoints.getMessages.matchFulfilled,
            (_state, { payload }) => {
                return payload
            }
        )
    }
})

export const { messages, newMessage } = messagesSlice.actions
export default messagesSlice.reducer
