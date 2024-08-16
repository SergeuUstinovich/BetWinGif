import { StateShema } from "../config/StateScheme";

export const getTokenUser = (state: StateShema) => state.auth.token;