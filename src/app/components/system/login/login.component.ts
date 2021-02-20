import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { LoginApiPath } from 'src/app/api_path/system/LoginApiPath';
import { QueryFields } from 'src/app/entity/QueryFields';
import { LoginService } from 'src/app/service/system/login/login.service';
import { UserService } from 'src/app/service/system/user/user.service';
import { CompressUtils } from 'src/app/util/CompressUtils';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
import { RequestUtil } from 'src/app/util/RequestUtil';
import { RouteUtils } from 'src/app/util/RouteUtils';
import { SecurityUtils } from 'src/app/util/SecurityUtils';
import { BaseComponent } from '../../BaseComponent';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent   implements OnInit  {
  public getListData(param: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  public onDeleteData(ids: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  public afterLoadData() {
    throw new Error('Method not implemented.');
  }
  public getSearchFields(): QueryFields {
    return;
  }
  public beforeDrawerAddButton(){
    return
  }

  public beforeDrawerSubmit(){
    if (ObjectUtils.isNotEmpty(this.uploadedFileCode)) {
      
      this.validateForm.value['userHead'] = this.uploadedFileCode;
     
    }
  }

  loginForm!: FormGroup;
  loaging = false
  async login() {
    this.loaging = true
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    console.log(this.loginForm)
    this.loginService.getPublicKey().subscribe(item=>{
      console.log("res",item)
      let security = SecurityUtils.encrypt(item , this.loginForm.value )
      let map = new Map()
      map.set("info",security)
    return this.http.postResquest(LoginApiPath.LOGIN_PATH,null,null,map).subscribe(item=>{
    
      if(item.code==200){
        this.notifly.success("提示信息！","登陆成功！")
          localStorage.setItem("token",item.data)
           
          this.router.route("/nav",{})
          this.loaging = false
      }else{
        this.loaging = false
      }
    
     })
  }) ;
   

  }
  public saveDrawerData(data: any): Observable<any> {
    let param = {}
    Object.keys(data).forEach(item=>{
      if(item!='checkPassword'){
        param[item]=data[item]
      }
      
    })
    param['roles']=[{id: 7}];
    return this.userService.registerUser(param)
  }

  constructor(public fb: FormBuilder, private request: HttpClient,public userService: UserService,
    public msg: NzMessageService ,private loginService:LoginService,private http:RequestUtil,private router :RouteUtils,
    private notifly: NzNotificationService,
    public modelService: NzModalService) {
super(fb, modelService)
}

 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userCode: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    
     

  }

  uploadedFileCode = null;


  public initDrawerEditForm(data){
      data = {
      id:null,
      versionNumber:null,
      deleteFlag:0,
      userEmail:null,
      userName:null,
      password:null,
      userCode:null,
      roles:[],
      userIntroduce:null,
      userHead:'2021/02/02/1520aa8f4244455f937f.jpeg',
      userStatus:1,
      
    }
    this.validateForm = this.fb.group({
      id: new FormControl({ value: data.id, disabled: false} ),
      versionNumber: new FormControl({ value: data.versionNumber, disabled: false }),
      deleteFlag: new FormControl({ value: data.deleteFlag, disabled: false }),
      userEmail: new FormControl({ value: data.userEmail, disabled: false }, [Validators.required, Validators.email]),
      password: new FormControl({ value: data.password, disabled: false },Validators.required),
      userName: new FormControl({ value: data.userName, disabled: false },  Validators.required ),
      checkPassword: [null, [Validators.required, this.confirmationValidator]],

      userCode: new FormControl({ value: data.userCode, disabled: !this.isAdd }, Validators.required),
      roleNames: new FormControl({ value: data.roleNames, disabled: false },),
      roles: new FormControl({ value: data.roles, disabled: false },),
      userIntroduce: new FormControl({ value: data.userIntroduce, disabled: false }),
      userHead: new FormControl({ value: data.userHead, disabled: false }),

    }
    )
  }




  previewVisible = false;
  headLoading = false;
  previewImage
  fileList = []

  customUpload = async (item) => {


    let data = await CompressUtils.compressImg(item.file, item.file.type)
    console.log(data)
    console.log(item.file)
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', data as any);
    const req = new HttpRequest('POST', item.action!, formData, {
      headers: new HttpHeaders({ "token": localStorage.getItem("token") }),
      reportProgress: true,
      withCredentials: true
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.request.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          // 处理上传进度条，必须指定 `percent` 属性来表示进度
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          // 处理成功
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      err => {
        // 处理失败
        item.onError!(err, item.file!);
      }
    );
  };

  handlePreview = (file: NzUploadFile) => {
    this.previewImage = this.previewImage || file.url || file.preview;


    this.previewVisible = true;

  };

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('只能上传jpg或png');
        observer.complete();
        return;
      }
      const isLt10M = file.size! / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.msg.error('头像不能大于10MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt10M);
      observer.complete();
    });
  };

  setHeaders = (file: NzUploadFile) => {
    return new Observable(
      (observer: Observer<{}>) => {
        observer.next({ "token": localStorage.getItem("token") })
        observer.complete()
      }
    )
  }


  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    console.log(info.file.status)
    switch (info.file.status) {
      case 'uploading':
        this.headLoading = true;
        break;
      case 'done':
        // this.fileList.push(info.file)
        console.log("图片上传成功", info.file.response.data)
        this.uploadedFileCode = info.file.response.data
        info.file.staus = 'done'
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.headLoading = false;
          this.fileList = [info.file]
          this.previewImage = img
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.headLoading = false;
        break;
    }
  }

}
