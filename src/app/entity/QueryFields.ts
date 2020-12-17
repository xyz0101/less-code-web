/**
 * 构造查询字段
 */
export class QueryFields{
    public param: Map<string, any>;
    constructor(){
        this.param = new Map();
    }

   static  buildFileds(): QueryFields{
        return new QueryFields();
    }
    /**
     * 设置查询字段
     * @param key 字段英文名
     * @param val 字段中文名
     */
    addField(key: string, val: any): QueryFields{
        this.param.set(key, val);
        return this;
    }


}