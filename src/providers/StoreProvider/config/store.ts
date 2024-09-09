import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateShema } from './StateScheme'
import { tokenReducer } from '../slice/tokenSlice'
import { gifReducer } from '../slice/gifSlice'
import { gifGenReducer } from '../slice/gifGenSlice'
import { userReducer } from '../slice/userSlice'
import { adminImgReducer } from '../slice/adminImgSlice'

export function createReduxStore(initialState?: StateShema) {
  const rootReducer: ReducersMapObject<StateShema> = {
    auth: tokenReducer,
    clientImg: gifReducer,
    gifGen: gifGenReducer,
    profile: userReducer,
    adminImg: adminImgReducer,
  }

  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  })
}
