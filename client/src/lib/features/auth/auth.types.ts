import { User } from "@/types"

export type AuthLoginDto = User

export interface AuthState {
    user: AuthLoginDto | undefined
    isLoggedIn: boolean
}