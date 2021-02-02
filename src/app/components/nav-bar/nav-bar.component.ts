import { Component, OnInit } from '@angular/core';
import { Base64 } from 'js-base64';
import { FileApiPath } from 'src/app/api_path/system/FileApiPath';
import { LoginApiPath } from 'src/app/api_path/system/LoginApiPath';
import { CommonConst } from 'src/app/common/constant/CommonConst';
import { LocalStorageConst } from 'src/app/common/constant/LocalStorageConst';
import { MenuService, TreeNode } from 'src/app/service/system/menu/menu.service';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
import { RequestUtil } from 'src/app/util/RequestUtil';
import { RouteUtils } from 'src/app/util/RouteUtils';
import { webSocket } from 'rxjs/webSocket';
import { TaskService } from 'src/app/service/task/task.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  fieldMapping={
    'key':'id',
    'parentId':'parent',
    'title':'name',
    'menuCode':'code',
    'level':'menuLevel',
    'routeUrl': 'menuUrl',
    'icon':'menuIcon',
    'menuOrder':'menuOrder',
    'menuType':'menuType',
   }
 
   ws: WebSocket;//定义websocket
  mode = false;
  dark = false;
  userinfo
  constructor(private http:RequestUtil,private menuService:MenuService,private router:RouteUtils,private message:TaskService) { }
  isCollapsed = false;
  menuTree :TreeNode[]
  ngOnInit(): void {
    this.message.addTask("N","USER")
    this.connectWs()
    this.menuService.getMenuListByUserNoButton(this.fieldMapping).subscribe(item=>{
      if(item.code=='200'){
        this.menuTree=item.data
      }
    })
    this.http.getResquest(LoginApiPath.GET_CURRENT_USER).subscribe(item=>{
      if(item.code=='200'){
        this.userinfo = item.data;
        let token  = Base64.encode(localStorage.getItem('token'));
        this.userinfo.iconSrc = FileApiPath.DOWNLOAD_FILE_PATH+'?token='+token+'&code='+this.userinfo.userHead
        localStorage.setItem('userinfo',JSON.stringify(this.userinfo))
        this.message.addTask("Y","USER")
      }
    })
  }
 

  logOut(){
    this.http.getResquest(LoginApiPath.LOGOUT_PATH).subscribe(res=>{
      if(res.code=='200'){
        RequestUtil.notifySuccess("注销成功")
        localStorage.removeItem("currentUserInfo")
        this.router.simpleRoute('/login')
      }
    })
  }
 //socket连接
 connectWs() {
  
    this.message.getTask("USER").subscribe(item=>{
      if(item=='Y'){
        let info =localStorage.getItem('userinfo')
        let user = JSON.parse(info);
        console.log('连接websocket')
        if (this.ws != null) { this.ws.close() };
        this.ws = new WebSocket("ws://tencent.jenkin.tech:8050/lsc/system/ws/"+user.userCode);
        let that  = this;
        this.ws.onopen = function (event) {
                //socket 开启后执行，可以向后端传递信息
                that.ws.send('sonmething');
                
        }
        this.ws.onmessage = function (event) {
              console.log('收到消息：',event)
              let data = JSON.parse(event.data);
              that.message.addTask(data,data.triggerCode)
                
        }
        this.ws.onerror = function (event) {
                //socket error信息
                console.log(event)
                
        }
        this.ws.onclose = function (event) {
                //socket 关闭后执行
              
        }
      }
      
    
    })
    
    
  
 }
}
