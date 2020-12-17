
export class GetParams{
    param: Map<string, string>;
    constructor(){
        this.param = new Map();
    }

   static  buildParams(): GetParams{
        return new GetParams();
    }

    setParam(key: string, val: string): GetParams{
        this.param.set(key, val);
        return this;
    }


}
