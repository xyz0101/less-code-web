import {JSEncrypt} from 'jsencrypt';
import { LocalStorageConst } from '../common/constant/LocalStorageConst';
import { ObjectUtils } from './ObjectUtils';

export class SecurityUtils{
    static encrypt(publicKey, data): any {
        const jse = new JSEncrypt({default_key_size: 1024});
        jse.setPublicKey(publicKey);
        const encrypted = jse.encrypt(JSON.stringify(data));
        return encrypted;
    }

    static cacheUserPermission(menuTree: any[]) {
      console.log('开始缓存菜单：',menuTree)
        let urls= []
        menuTree.forEach(item=>{
            this.loadPermission(item,urls)
        })
        let urlStr =''
        urls.forEach(item=>{urlStr=urlStr+','+item});
        urlStr =urls.length>0?urlStr.substring(1,urlStr.length):urlStr
        console.log('缓存用户的url:',urlStr)
        localStorage.setItem(LocalStorageConst.USER_URLS_KEY,urlStr );
      }
      static loadPermission(item: any , urls:any[]) {
         if(ObjectUtils.isNotEmpty(item.menuUrl)){
          urls.push(item.menuUrl)
         }
         if(ObjectUtils.isNotEmpty(item.subList)&&item.subList.length>0){
           item.subList.forEach(child=>{
             this.loadPermission(child,urls)
           })
         }
      }

}
