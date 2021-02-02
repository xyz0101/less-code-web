import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
@Injectable()
export class RouteUtils{
    private static activateInfo=null;
    static router:Router;
    constructor(private activateInfo:ActivatedRoute, private router:Router){
        RouteUtils.activateInfo = this.activateInfo
        RouteUtils.router = this.router;
    }


    

    public route(path,param){
        this.router.navigate([path],{queryParams:param} );
      }
    
      public simpleRoute(path){
        this.router.navigate([path] );
      }
    
     public getRouteParams():Observable<any>{
        　return this.activateInfo.queryParams 
     } 
    public getRouteUrl():Observable<any>{
        　return this.activateInfo.url 
     }
}