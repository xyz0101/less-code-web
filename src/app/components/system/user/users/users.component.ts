import { Component, OnInit } from '@angular/core';
import { Qo } from 'src/app/entity/Qo';
import { UserService } from 'src/app/service/user/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FileApiPath } from 'src/app/api_path/FileApiPath';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
import { FileService } from 'src/app/service/file/file.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RequestUtil } from 'src/app/util/RequestUtil';
import { BaseComponent } from 'src/app/components/BaseComponent';
import { CompressUtils } from 'src/app/util/CompressUtils';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BaseComponent implements OnInit {
  public saveData(data: any) {
    this.userService.saveUser(data)
  }
  public getListData(param: any): Observable<any> {
    return this.userService.listUserByPage(param)
  }
  public beforeInitForm(data: any) {
    
    if(ObjectUtils.isNotEmpty(data.userHead)){
      this.headLoading=true
      this.fileService.downloadFile(data.userHead).subscribe(item=>{
        this.getBase64(item,callback=>{
          
          this.fileList=[{
            name:'img.png',
            status:"done",
            url:callback,
            uid:"-1"
          }]
        this.headLoading=false
        })
      })
    }
  }
  public beforeSubmitForm() {
    if(ObjectUtils.isNotEmpty(this.uploadedFileCode)){
      this.validateForm.value['userHead']=this.uploadedFileCode;
    }
  }
  public beforeAddButton() {
    this.fileList=[]
  }
  public onDeleteData(ids: any): Observable<any> {
   return  this.userService.deleteUser(ids)
  }

  
  fileUploadPath = FileApiPath.UPLOAD_FILE_PATH
  uploadedFileCode=null;
  isAdd=false;
  /**
   * 初始化方法
   */
  ngOnInit(): void {
    
    this.reload()
  }
 
  constructor(public userService: UserService,public fb: FormBuilder,
    public msg: NzMessageService,public fileService:FileService,
    public modelService:NzModalService,private request:HttpClient) {
        super(fb,modelService)
   }
  



 

   /****************************************************
   **************头像上传部分****************************
   ***************************************************
  */
 previewVisible = false;
  headLoading = false;
  previewImage
  fileList=[]

  customUpload=  async (item ) => {
   
    
   let data = await CompressUtils.compressImg(item.file) 
      console.log(data)
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    const req = new HttpRequest('POST', item.action!, formData, {
      headers:new HttpHeaders({"token":localStorage.getItem("token")}),
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

  handlePreview =   (file: NzUploadFile) => {
    this.previewImage = file.url || file.preview;
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

  setHeaders=(file: NzUploadFile)=>{
    return new Observable(
      (observer:Observer<{}>)=>{
        observer.next({"token":localStorage.getItem("token")})
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
        console.log("图片上传成功",info.file.response.data)
       this.uploadedFileCode = info.file.response.data
       info.file.staus='done'
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.headLoading = false;
          this.fileList=[info.file]
          
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.headLoading = false;
        break;
    }
  }

}
