import { adminImgs } from '../../../types/adminImgType'
import { TokenScheme } from '../../../types/AuthToken'
import { gifGeneratedType } from '../../../types/gifGeneratedType'
import { adminImg } from '../../../types/gifType'
import { UserScheme } from '../../../types/userType'

export interface StateShema {
  auth: TokenScheme
  clientImg: adminImg
  gifGen: gifGeneratedType
  profile: UserScheme
  adminImg: adminImgs
}
