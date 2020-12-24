export class ObjectUtils{

public static isNotEmpty(data):boolean{
    return !(data==null||data==undefined);
}
public static isNotNull(data):boolean{
    return !(data==null);
}
public static isNotUndefined(data):boolean{
    return !(data==undefined);
}
 /**
   * source 为接收值的对象,左边为赋值字段
   */
  public static  mapObject( source  , target,   fieldMapping ) {
    Object.keys(fieldMapping).forEach(item=>{
      source[item] = target[fieldMapping[item]]
    })
 }
 /**
   * source 为接收值的对象，右边为赋值字段
   */
  public static  revertMapObject( source  , target,   fieldMapping ) {
    Object.keys(fieldMapping).forEach(item=>{
      source[fieldMapping[item]] = target[item]
    })
 }
}