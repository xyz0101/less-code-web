import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginApiPath } from 'src/app/api_path/system/LoginApiPath';
import { LoginService } from 'src/app/service/system/login/login.service';
import { RequestUtil } from 'src/app/util/RequestUtil';
import { RouteUtils } from 'src/app/util/RouteUtils';
import { SecurityUtils } from 'src/app/util/SecurityUtils';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  loaging = false
  async submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm)
    this.loginService.getPublicKey().subscribe(item=>{
      console.log("res",item)
      let security = SecurityUtils.encrypt(item , this.validateForm.value )
      let map = new Map()
      map.set("info",security)
    return this.http.postResquest(LoginApiPath.LOGIN_PATH,null,null,map).subscribe(item=>{
      this.loaging = true
      if(item.code==200){
        this.notifly.success("提示信息！","登陆成功！")
          localStorage.setItem("token",item.data)
          localStorage.setItem("token",item.data)
          this.router.route("/nav/system/user",{})
          this.loaging = false
      }
    
     })
  }) ;
   

  }

  constructor(private fb: FormBuilder,private loginService:LoginService,private http:RequestUtil,private router :RouteUtils,
    private notifly: NzNotificationService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userCode: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
