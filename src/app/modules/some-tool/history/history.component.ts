import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoryApiPath } from 'src/app/api_path/system/HistoryApiPath';
import { GetParams } from 'src/app/entity/GetParams';
import { RequestUtil } from 'src/app/util/RequestUtil';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit ,OnDestroy{
  currentUser={
    department:null
  };
  timer = null
  constructor(private fb: FormBuilder,private http:RequestUtil) { }
  
  taskForm
  loginSuccess=false
  currentGrade={
    integral: null,
    name: null,
    university_name: null,
    province_name:null,
    join_times:null
  }
  currentUserInfo={
    photo:''
  }
  loading = true;
  qrCodeUrl
  showForm=true
  ngOnInit(): void {

    this.init()
   


      
    //获取登录二维码
    //https://oauth.u.hep.com.cn/oauth/wxapp/qrcode/5f582dd3683c2e0ae3aaacee?random=Ud6JRGVf86vN&useSelfWxapp=true&enableFetchPhone=false
    // 获取token
    // https://ssxx.univs.cn/cgi-bin/authorize/token/?t=1612152761&uid=5fb278bff18a2c12929f495f&avatar=https:%2F%2Fnode2d-public.hep.com.cn%2Favatar-5fb278bff18a2c12929f495f-1605531839324&activity_id=5f71e934bcdbf3a8c3ba5061
  }



  init() {
    this.loading = true;

    this.http.getResquest(HistoryApiPath.GET_USER_TASK_STATUS_PATH).subscribe(item=>{
      if(item.code=='200'&&item.data=='N'){
          this.showForm=true
      }else if(item.data=='Y'){
        this.showForm = false;
      }
    })


    this.taskForm = this.fb.group({
      exceptGrade: [null, [Validators.required]],
      currentGrade: [null, [Validators.required]] 
      
    });

    // 获取当前用户的积分
    this.setCurrentGrade();
    
  }
  getCurrentUser() {
     this.http.getResquest(HistoryApiPath.CURRENT_USER_PATH).subscribe(item=>{
       if(item.code!='200'){
          this.needLogin()
       }else{
         localStorage.setItem('currentUser',item.data)
         this.currentUser = item.data;
       }
     })
  }
  setCurrentGrade() {
    
    this.http.getResquest(HistoryApiPath.CURRENT_GRADE_PATH).subscribe(item=>{
      if(item.code!='200'){
        this.needLogin();

      }else{
        this.loginSuccess = true;
        localStorage.setItem("currentGrade",JSON.stringify(item.data))
        this.currentGrade = item.data;
        if(this.currentGrade.integral!=undefined&&this.currentGrade.integral!=null){
          this.taskForm.get("currentGrade").setValue(this.currentGrade.integral)
        }
         //获取用户信息
        this.getCurrentUser()
      }
    })
    

  }
  needLogin() {
    this.loginSuccess = false;
    localStorage.removeItem("currentGrade")
     
      //获取qrCode
    this.getQrCode()
  }
  getQrCode() {
     this.http.getResquest(HistoryApiPath.GET_QRCODE_PATH).subscribe(item=>{
        if(item.data.qrcode!=null){
              this.qrCodeUrl = item.data.qrcode;
              this.loading = false;
              //开始定时获取登录状态
              this.checkLogin(item.data.random)
        }
     })
  }
  checkLogin(random: any) {
    this.timer=setInterval(() => {
      console.log('开始定时',random)
      if(!this.loginSuccess){ 
        let param = GetParams.buildParams().setParam("random",random);
        this.http.getResquest(HistoryApiPath.CHECK_LOGIN_PATH,param).subscribe(item=>{
          if(item.code=='200'&&item.data!=null&&item.data._id!=null&&item.data.token!=null){

              //获取token
              let param = GetParams.buildParams().setParam('uid',item.data._id)
              this.http.getResquest(HistoryApiPath.GET_TOKEN_PATH,param).subscribe(tk=>{
                item.data.token = tk.data
                localStorage.setItem("currentUserInfo",JSON.stringify(item.data))
                this.currentUserInfo = item.data
                this.loading = false;
                clearTimeout(this.timer);
                this.ngOnInit()
              })

             
              
          } 
        })
      }
    }, 1000);
  }
  startRun(): void {
    for (const i in this.taskForm.controls) {
      this.taskForm.controls[i].markAsDirty();
      this.taskForm.controls[i].updateValueAndValidity();
    }
    let val = this.taskForm.value;
    let data = {maxGrade:Number(val.exceptGrade),currentGrade:val.currentGrade }
    console.log('开始任务',data)
    this.http.postResquest(HistoryApiPath.START_TASK_PATH,data).subscribe(item=>{
      if(item.code=='200'&&item.data=='Y'){
          this.showForm = false
      } 
    })
  }
  ngOnDestroy(): void {
    if(this.timer!=null){
      console.log('清除定时器')
      clearTimeout(this.timer);
    }
  }
}
