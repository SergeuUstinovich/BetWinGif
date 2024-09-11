import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { adminGifScheme, adminGifType } from "../../../types/adminGifType";

const initialState: adminGifScheme = {}

export const adminGifSlice = createSlice({
  name: "adminGif",
  initialState,
  reducers: {
    adminGifAdd: (state, action: PayloadAction<adminGifType[]>) => {
      state.images = action.payload;
    },
    
  },
});

export const { actions: adminGifActions } = adminGifSlice;
export const { reducer: adminGifReducer } = adminGifSlice;
