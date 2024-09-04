import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "../../../types/userType.ts";

const initialState: UserType = {
    isAdmin: undefined,
    promocode: undefined,
    isGoogleProfile: undefined,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userAdd: (state, action: PayloadAction<{ isAdmin: string, promocode: string, isGoogleProfile: string}>) => {
            state.isAdmin = action.payload.isAdmin
            state.promocode = action.payload.promocode
            state.isGoogleProfile = action.payload.isGoogleProfile
        }
    }
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice