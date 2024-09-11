import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { gifGeneratedType } from "../../../types/gifGeneratedType";

const initialState: gifGeneratedType = {
    urlGif: undefined
}

export const gifGetSlice = createSlice({
  name: "gifGen",
  initialState,
  reducers: {
    gifGenAdd: (state, action: PayloadAction<string[]>) => {
        state.urlGif = action.payload;
    },
  },
});

export const { actions: gifGenActions } = gifGetSlice;
export const { reducer: gifGenReducer } = gifGetSlice;
