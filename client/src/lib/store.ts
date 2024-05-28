import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '@/services/api'
import authReducer from '@/lib/features/auth/auth.slice'
import activeUsersReducer from '@/lib/features/active-users/active-users.slice'
import messagesReducer from '@/lib/features/messages/messages.slice'

export const createStore = (
    options?: ConfigureStoreOptions['preloadedState'] | undefined,
) => configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        activeUsers: activeUsersReducer,
        messages: messagesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    ...options,
})


export const store = createStore()

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
