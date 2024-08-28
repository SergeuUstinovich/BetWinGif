import { TokenScheme } from "../../../types/AuthToken";
import { gifGeneratedType } from "../../../types/gifGeneratedType";
import { gifType } from "../../../types/gifType";

export interface StateShema {
    auth: TokenScheme;
    gif: gifType;
    gifGen: gifGeneratedType
}