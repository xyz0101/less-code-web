export class MyResponse {


    code: string;
    msg: string;
    data: any;
    constructor() { }
    public static ok():MyResponse{
        let res = new MyResponse();
        res.code='200'
        return res;
    }

}
