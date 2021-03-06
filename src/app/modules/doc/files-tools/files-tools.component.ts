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

    console.log("??????????????????",this.downloadCode)
    const a = document.createElement('a'); // ??????a??????
    document.body.appendChild(a); // ???body????????????a??????
    a.setAttribute('style', 'display:none'); // a ??????????????????
    a.setAttribute('href', url); // ??????url?????? a???????????????href?????????
    a.setAttribute('download', 'out.zip'); // ??????a??????????????????download  template.xlsx ???????????????????????????template ?????????xlsx
    a.click(); // ??????a??????
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
     
      this.msg.success(`${file.name} ????????????`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} ????????????`);
    }
  }
  wordList = []
  excelList = []
  customUpload = async (item) => {


    this.fileType = item.file.type
    this.fileName = item.file.name
    this.fileSize = item.file.size
    console.log(item.file)
    // ???????????? FormData ??????????????????????????????????????????
    const formData = new FormData();

    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    const req = new HttpRequest('POST', item.action!, formData, {
      headers: new HttpHeaders({ "token": localStorage.getItem("token") }),
      reportProgress: true,
      withCredentials: true
    });
    // ?????????????????? `Subscription` ?????????nz-upload ????????????????????????????????????
    return this.request.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        // console.log('??????????????????' ,event)
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          // ???????????????????????????????????? `percent` ?????????????????????
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          // ????????????
          // console.log('??????????????????' ,event)
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      err => {
        // ????????????
        item.onError!(err, item.file!);
      }
    );
  };
  
 



 
}
