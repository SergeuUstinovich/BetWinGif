import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateShema } from "./StateScheme";
import { tokenReducer } from "../slice/tokenSlice";

export function createReduxStore(initialState?: StateShema) {
  const rootReducer: ReducersMapObject<StateShema> = {
    auth: tokenReducer,
  };

  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}
