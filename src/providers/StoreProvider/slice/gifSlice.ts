import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { gifType } from "../../../types/gifType";

const initialState: gifType = {
    gif: undefined
}

export const gifSlice = createSlice({
  name: "gif",
  initialState,
  reducers: {
    gifAdd: (state, action: PayloadAction<string>) => {
      state.gif = action.payload;
    },
    
  },
});

export const { actions: gifActions } = gifSlice;
export const { reducer: gifReducer } = gifSlice;
