import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { adminImg } from "../../../types/gifType";

const initialState: adminImg = {
  url: undefined
}

export const gifSlice = createSlice({
  name: "imgAdmin",
  initialState,
  reducers: {
    gifAdd: (state, action: PayloadAction<string[]>) => {
      state.url = action.payload;
    },
    
  },
});

export const { actions: gifActions } = gifSlice;
export const { reducer: gifReducer } = gifSlice;
