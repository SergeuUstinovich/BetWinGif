import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { StateShema } from "./StateScheme";
import { tokenReducer } from "../slice/tokenSlice";
import { gifReducer } from "../slice/gifSlice";

export function createReduxStore(initialState?: StateShema) {
  const rootReducer: ReducersMapObject<StateShema> = {
    auth: tokenReducer,
    gif: gifReducer,
  };

  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}
