import { TokenScheme } from "../../../types/AuthToken";
import { gifGeneratedType } from "../../../types/gifGeneratedType";
import { gifType } from "../../../types/gifType";
import {UserScheme} from "../../../types/userType.ts";

export interface StateShema {
    auth: TokenScheme;
    gif: gifType;
    gifGen: gifGeneratedType
    profile: UserScheme
}