import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/system/user/user.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FileApiPath } from 'src/app/api_path/system/FileApiPath';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { ObjectUtils } from 'src/app/util/ObjectUtils';
import { FileService } from 'src/app/service/system/file/file.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseComponent } from 'src/app/components/BaseComponent';
import { CompressUtils } from 'src/app/util/CompressUtils';
import { QueryFields } from 'src/app/entity/QueryFields';
import { RoleService } from 'src/app/service/system/role/role.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BaseComponent implements OnInit {

  constructor(public userService: UserService, public fb: FormBuilder,
    private roleService: RoleService,
    public msg: NzMessageService, public fileService: FileService,
    public modelService: NzModalService, private request: HttpClient) {
    super(fb, modelService)
  }

  roleList = []


  public initDrawerEditForm(data ) {
    this.initUserHead(data)
    this.initRoleList()
    let roleIds = []
    if (data.roles) {
      data.roles.forEach(item => roleIds.push(item.id))
    }
    console.log('初始化角色：', data)
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
      resetPassword: new FormControl({ value: '0', disabled: false }, [Validators.required]),
      userIntroduce: new FormControl({ value: data.userIntroduce, disabled: false }),
      userHead: new FormControl({ value: data.userHead, disabled: false }),
      userStatus: new FormControl({ value: JSON.stringify(data.userStatus), disabled: false }, [Validators.required]),
      selectedRoles: new FormControl({ value: roleIds, disabled: false },),

    }
    )


    console.log('初始化角色：', this.validateForm.value)
  }



  initRoleList() {

    this.roleService.listAllRoles().subscribe(item => {

      this.roleList = item.data
    })

  }
  initUserHead(data: any) {
    if (ObjectUtils.isNotEmpty(data.userHead)) {
      this.headLoading = true
      this.fileService.downloadFile(data.userHead).subscribe(item => {
        this.getBase64(item.data, callback => {
          this.fileList = [{
            name: 'img.png',
            status: "done",
            url: callback,
            uid: "-1"
          }]
          this.headLoading = false
        })
      })
    }
  }



  public saveDrawerData(data: any): Observable<any> {
    return this.userService.saveUser(data)
  }
  public getListData(param: any): Observable<any> {
    return this.userService.listUserByPage(param)
  }

  public beforeDrawerSubmit() {
    if (ObjectUtils.isNotEmpty(this.uploadedFileCode)) {
      
      this.validateForm.value['userHead'] = this.uploadedFileCode;
     
    }
    let roleIds = this.validateForm.get('selectedRoles').value
    let arr = []
    roleIds.forEach(element => {
      arr.push({id:element})
    });
    this.validateForm.value['roles']=arr
  }
  public beforeDrawerAddButton() {
    this.fileList = []
  }
  public onDeleteData(ids: any): Observable<any> {
    return this.userService.deleteUser(ids)
  }

  public getSearchFields() {
    this.showSearch = true
    return QueryFields.buildFileds()
      .addField("userCode", "用户编码")
      .addField("userName", "用户名称")
      .addField("userEmail", "用户邮箱")
  }











  uploadedFileCode = null;
  isAdd = false;
  /**
   * 初始化方法
   */
  ngOnInit(): void {

    this.reload()
  }




  /**
   * 头像加载
   * 
   */

  userHeads = new Map();



  afterLoadData() {
    console.log('加载头像')
    this.dataList.forEach(item => {
      this.fileService.downloadFile(item.userHead).subscribe(file => {
        let res = new window.File([file.data], item.userHead, { type: file.data.type });
        // this.userHeads=this.userHeads.set(item.userHead,file)
        this.getBase64(res, (img: string) => {

          this.userHeads = this.userHeads.set(item.userHead, img)
        });

      })
    })
  }









  /****************************************************
  **************头像上传部分****************************
  ***************************************************
 */
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











  defaultIcon = 'apple'
  defaultSelectId = 3



}
