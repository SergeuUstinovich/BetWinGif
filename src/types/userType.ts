export interface UserType {
    isAdmin: boolean,
    promocode: string,
    isGoogleProfile: boolean
}

export interface UserScheme {
    user?: UserType
}