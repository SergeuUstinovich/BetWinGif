import { TokenScheme } from "../../../types/AuthToken";
import { gifType } from "../../../types/gifType";

export interface StateShema {
    auth: TokenScheme;
    gif: gifType;
}