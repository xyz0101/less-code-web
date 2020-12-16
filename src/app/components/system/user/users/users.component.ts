import { Component, OnInit } from '@angular/core';
import { Qo } from 'src/app/entity/Qo';
import { UserService } from 'src/app/service/user/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FileApiPath } from 'src/app/api_path/FileApiPath';
import { HttpHeaders } from '@angular/common/http';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
import { FileService } from 'src/app/service/file/file.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RequestUtil } from 'src/app/util/RequestUtil';
import { BaseComponent } from 'src/app/components/BaseComponent';
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
      this.fileService.downloadFile(data.userHead).subscribe(item=>{
        this.getBase64(item,callback=>{
          this.avatarUrl = callback;
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
    this.avatarUrl=null;
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
    public modelService:NzModalService) {
        super(fb,modelService)
   }
  



 

   /****************************************************
   **************头像上传部分****************************
   ***************************************************
  */

  headLoading = false;
  avatarUrl?: string;

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
    switch (info.file.status) {
      case 'uploading':
        this.headLoading = true;
        break;
      case 'done':
        console.log("图片上传成功",info.file.response.data)
       this.uploadedFileCode = info.file.response.data
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.headLoading = false;
          this.avatarUrl = img;
         
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.headLoading = false;
        break;
    }
  }

}
