import { TokenScheme } from "../../../types/AuthToken";
import { gifGeneratedType } from "../../../types/gifGeneratedType";
import { gifType } from "../../../types/gifType";
import {UserType} from "../../../types/userType.ts";

export interface StateShema {
    auth: TokenScheme;
    gif: gifType;
    gifGen: gifGeneratedType
    user: UserType
}