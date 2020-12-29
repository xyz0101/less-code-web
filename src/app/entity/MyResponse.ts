export class MyResponse<T> {


    code: string;
    msg: string;
    extraData:any
    data: T;
    constructor() { }
    public  static  ok<T>(data?):MyResponse<T>{
        let res = new MyResponse<T>();
        res.code='200'
        res.data = data
        return res;
    }
     
}
