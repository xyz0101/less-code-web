import { ObjectUtils } from "../util/ObjectUtils";
import { Sort } from "./Sort";

export class Qo{
    private page:number ;
    private pageSize:number ;
    private sorts:Sort[];
    private data:any;
    
    public static builder():Qo{
        return new Qo();
    }
    public setPage(currentPage):Qo{
        this.page = currentPage;
        return this;
    }
    public setPageSize(size):Qo{
        this.pageSize = size;
        return this;
    }
    public setSorts(sortField,sortValue):Qo{
        if(ObjectUtils.isNotEmpty(sortValue)&&ObjectUtils.isNotEmpty(sortField)){
            this.sorts.push(new Sort(sortField,sortValue))
        }
        return this;
    }
    public setData(data):Qo{
        if(ObjectUtils.isNotEmpty(data)){
            this.data = data;
        }
        return this;
    }
}