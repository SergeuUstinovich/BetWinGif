export interface UserType {
    is_admin: boolean;
    promocode: string;
    is_google_profile: boolean;
}

export interface UserScheme {
    user?: UserType;
}