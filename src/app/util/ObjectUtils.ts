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

}