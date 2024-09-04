import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserScheme, UserType } from "../../../types/UserType";

const initialState: UserScheme = {}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action: PayloadAction<UserType | undefined>) => {
      state.user = action.payload;
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
