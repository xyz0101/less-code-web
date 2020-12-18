import { Component, OnInit } from '@angular/core';
import { LoginApiPath } from 'src/app/api_path/system/LoginApiPath';
import { UserApiPath } from 'src/app/api_path/system/UserApiPath';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private http:RequestUtil) { }
  isCollapsed = false;

  ngOnInit(): void {
  }

  logOut(){
    this.http.getResquest(LoginApiPath.LOGOUT_PATH).subscribe(res=>{
      if(res.code=='200'){
        RequestUtil.notifySuccess("注销成功")
        this.http.simpleRoute('/login')
      }
    })
  }

}
