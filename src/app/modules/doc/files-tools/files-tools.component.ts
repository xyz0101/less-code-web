import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Base64 } from 'js-base64';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { WebUploaderComponent } from 'ngx-webuploader';
import { Observable, Observer } from 'rxjs';
import { FileApiPath } from 'src/app/api_path/system/FileApiPath';
import { BaseComponent } from 'src/app/components/BaseComponent';
import { QueryFields } from 'src/app/entity/QueryFields';
import { FileToolsService } from 'src/app/service/files/file-tools/file-tools.service';
import { LscFileService } from 'src/app/service/files/file/LscFile.service';
import { FileService } from 'src/app/service/system/file/file.service';
import { TaskService } from 'src/app/service/task/task.service';
import { RequestUtil } from 'src/app/util/RequestUtil';
import { RouteUtils } from 'src/app/util/RouteUtils';

@Component({
  selector: 'app-files-tools',
  templateUrl: './files-tools.component.html',
  styleUrls: ['./files-tools.component.css']
})
export class FilesToolsComponent extends BaseComponent implements OnInit {
  public getListData(param: any): Observable<any> {
    return null;
  }
  public onDeleteData(ids: any): Observable<any> {
    return null;
  }
  public afterLoadData() {
   
  }
  public getSearchFields(): QueryFields {
     return null;
  }

  beforeFormSubmit() {
    this.validataFormAndTrowError()
    this.submitLoading = true;
    this.downloadCode = null;
  }

  saveFormData(data) {
    return this.fileToolsService.generate(data)
  }
  afterSubmitForm(data){
    this.downloadCode = data;
    this.submitLoading = false;
  }
  submitLoading =false
  downloadCode=null
  validateForm: FormGroup;
  downloadFile(): Observable<any>{
    return this.fileService.downloadFile(this.downloadCode)
  }
  downloadResult(){
    let token  = Base64.encode(localStorage.getItem('token'));
    let url = FileApiPath.DOWNLOAD_FILE_PATH+'?token='+token+'&code='+this.downloadCode

    console.log("下载文件编码",this.downloadCode)
    const a = document.createElement('a'); // 创建a标签
    document.body.appendChild(a); // 向body里面添加a标签
    a.setAttribute('style', 'display:none'); // a 标签样式隐藏
    a.setAttribute('href', url); // 拼接url，（ a标签里面的href属性）
    a.setAttribute('download', 'out.zip'); // 设置a标签的属性为download  template.xlsx 默认下载的文件名为template 格式是xlsx
    a.click(); // 点击a标签
  }

  ngOnInit(): void {
    this.editType="form"
  }
   
  
  
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } 
    return {};
  };

  constructor(
    
    public fb: FormBuilder,
    private taskService: TaskService,
    public msg: NzMessageService,
    private router: RouteUtils,
    private request: HttpClient,
    private fileService: FileService,
    private fileToolsService: FileToolsService,
    public modelService: NzModalService) {
    super(fb, modelService)
   
  
  
    this.validateForm = this.fb.group({
      rowStartIndex: new FormControl({ value: null, disabled: false} ,[Validators.required]),
      fileNameCol: new FormControl({ value:null, disabled: false },[Validators.required]),
      word: new FormControl({ value: null, disabled: false },[Validators.required]),
      excel: new FormControl({ value: null, disabled: false }, [Validators.required]),
      

    }
    )

  }
  


 
  fileType;
  fileName;
  fileSize;
  handleChange({ file, fileList }: NzUploadChangeParam,name): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      if(name=='word'){
        this.wordList = [file]

      }else if(name =='excel'){
        this.excelList = [file]
      }
      let uploadedFileCode = file.response.data
      this.validateForm.get(name).setValue(uploadedFileCode)
     
      this.msg.success(`${file.name} 上传成功`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} 上传失败`);
    }
  }
  wordList = []
  excelList = []
  customUpload = async (item) => {


    this.fileType = item.file.type
    this.fileName = item.file.name
    this.fileSize = item.file.size
    console.log(item.file)
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();

    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    const req = new HttpRequest('POST', item.action!, formData, {
      headers: new HttpHeaders({ "token": localStorage.getItem("token") }),
      reportProgress: true,
      withCredentials: true
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.request.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        // console.log('文件上传响应' ,event)
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          // 处理上传进度条，必须指定 `percent` 属性来表示进度
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          // 处理成功
          // console.log('文件上传响应' ,event)
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      err => {
        // 处理失败
        item.onError!(err, item.file!);
      }
    );
  };
  
 



 
}
