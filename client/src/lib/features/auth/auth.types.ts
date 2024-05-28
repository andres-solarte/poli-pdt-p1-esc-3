export type AuthLoginDto = {
    name: string,
    email: string,
}

export interface AuthState {
    user: AuthLoginDto | undefined
    isLoggedIn: boolean
}