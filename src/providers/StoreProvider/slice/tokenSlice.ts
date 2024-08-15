import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TokenScheme } from "../../../types/AuthToken"

const initialState: TokenScheme = {
    token: '1'
}
//localStorage.getItem('userToken') ?? undefined
export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        initAuthData: (state, action: PayloadAction<string>) => {
            // localStorage.setItem('userToken', action.payload)
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = undefined
            // localStorage.removeItem('userToken');
        }
    }
})

export const {actions: tokenActions} = tokenSlice
export const {reducer: tokenReducer} = tokenSlice