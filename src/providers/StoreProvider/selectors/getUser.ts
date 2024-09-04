import { StateShema } from "../config/StateScheme";

export const getUser = (state: StateShema) => state.profile.user;