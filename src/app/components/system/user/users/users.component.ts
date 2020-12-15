import { Component, OnInit } from '@angular/core';
import { Qo } from 'src/app/entity/Qo';
import { UserService } from 'src/app/service/user/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FileApiPath } from 'src/app/api_path/FileApiPath';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  total = 1;
  userList:   [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  fileUploadPath = FileApiPath.UPLOAD_FILE_PATH

  /**
   * 初始化方法
   */
  ngOnInit(): void {
    
    this.listUser(1,10,null,null,null)
  }

  constructor(private userService: UserService,private fb: FormBuilder,private msg: NzMessageService) {

   }
listUser(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortValue: string | null,
    data:  { key: string; value: string  } 
  ): void {
    this.loading = true;
    let param = Qo.builder().setPage(pageIndex).setPageSize(pageSize).setSorts(sortField,sortValue).setData(data);
    this.userService.listUserByPage(  param ).subscribe(data => {
      this.loading = false;
      this.total = data.data.total;
      this.userList = data.data.records;
    });
  }


editUser(data){
  // this.isFormEdit=true;
  console.log(data)
  this.initForm(data)
  this.open()
}


  /****************************************************
   **************抽屉部分*******************************
   ****************************************************
   */
  isDrawerEdit =false;
  visible = false;
  drawerWidth="35%"
  open(): void {
    this.isDrawerEdit=true;
    this.visible = true;
  }

  close(): void {
    this.isFormEdit=false;
    this.isDrawerEdit=false;
    this.visible = false;
  }
 /****************************************************
   **************对话框部分****************************
   ***************************************************
  */

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }


   /****************************************************
   **************表单编辑部分****************************
   ***************************************************
  */

  isFormEdit =false;
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  initForm(data){
    this.validateForm = this.fb.group({
      userEmail: [data.userEmail, [Validators.email, Validators.required]],
      password: [data.password, [Validators.required]],
      userName: [data.userName, [Validators.required]],
      userCode: [data.userCode, [Validators.required]],
      resetPassword: ['0', [Validators.required]],
      userIntroduce: [null ],
      userHead: [null ],
      userStatus: [JSON.stringify(data.userStatus), [Validators.required]]
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  
    this.close();
    console.log("表单提交数据",this.validateForm.value)
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
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

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

}
