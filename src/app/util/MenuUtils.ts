import { CommonConst } from '../common/constant/CommonConst';
import { ObjectUtils } from './ObjectUtils';

export class MenuUtils{


  /**
   * 缓存用户的按钮权限
   * @param url
   * @param sub 
   */
  static cacheUserButtonMap(url,sub: any[]) {
     if(!ObjectUtils.isNotEmpty(sub)){
       return 
     }
     let buttons = CommonConst.USER_BUTTON_MAP.get(url);
     buttons =buttons==null?[]:buttons;
     sub.forEach(item=>{
       if(item.meunType ==2){
        buttons.push(item.code)
       }
     })
     CommonConst.USER_BUTTON_MAP.set(url,buttons);

  }
    /**
   * 去除不显示的对象，目前暂时定为类型为button
   * @param children 
   */
  public static removeNotShowItem(children: any[],showButton): any[] {
    if(children&&children.length>0&&! showButton){
     return children.filter(item=>Number(item['menuType'])!=2)
    }
    return children;
 }
}