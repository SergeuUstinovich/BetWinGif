import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { adImage, adminImgs } from "../../../types/adminImgType";

const initialState: adminImgs = {}

export const adminImgSlice = createSlice({
  name: "adminImg",
  initialState,
  reducers: {
    adminImgAdd: (state, action: PayloadAction<adImage[]>) => {
      state.images = action.payload;
    },
    
  },
});

export const { actions: adminImgActions } = adminImgSlice;
export const { reducer: adminImgReducer } = adminImgSlice;
