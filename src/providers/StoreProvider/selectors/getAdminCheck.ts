import { StateShema } from "../config/StateScheme";

export const getAdminCheck = (state: StateShema) => state.auth.admin;