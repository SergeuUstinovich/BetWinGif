import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateShema } from './StateScheme'
import { tokenReducer } from '../slice/tokenSlice'
import { gifReducer } from '../slice/gifSlice'
import { gifGenReducer } from '../slice/gifGenSlice'
import { userReducer } from '../slice/userSlice'

export function createReduxStore(initialState?: StateShema) {
  const rootReducer: ReducersMapObject<StateShema> = {
    auth: tokenReducer,
    gif: gifReducer,
    gifGen: gifGenReducer,
    profile: userReducer,
  }

  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  })
}
