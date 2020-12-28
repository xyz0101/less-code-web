import { LocalStorageConst } from '../common/constant/LocalStorageConst'

export class CommonUtils{

    public   getCurrentUserCode():string{
        return localStorage.getItem(LocalStorageConst.CURRENT_USER_CODE_KEY)
    }

}