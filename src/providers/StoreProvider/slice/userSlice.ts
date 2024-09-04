import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserScheme, UserType} from "../../../types/userType.ts";

const initialState: UserScheme = {

}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userAdd: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload
        }
    }
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice