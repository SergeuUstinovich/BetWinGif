import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { gifGeneratedType } from "../../../types/gifGeneratedType";

const initialState: gifGeneratedType = {
    svgContent: undefined,
    text: undefined
}

export const gifGetSlice = createSlice({
  name: "gifGen",
  initialState,
  reducers: {
    gifGenAdd: (state, action: PayloadAction<{ svgContent: string; text: string }>) => {
        state.svgContent = action.payload.svgContent;
        state.text = action.payload.text;
    },
    
  },
});

export const { actions: gifGenActions } = gifGetSlice;
export const { reducer: gifGenReducer } = gifGetSlice;
