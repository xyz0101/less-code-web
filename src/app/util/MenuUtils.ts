export class MenuUtils{
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