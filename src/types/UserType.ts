export interface UserType {
    is_admin: string;
    is_google_profile: boolean;
    promocode: string;
}

export interface UserScheme {
    user?: UserType;
}