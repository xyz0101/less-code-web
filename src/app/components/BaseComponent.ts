import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NzFormTooltipIcon } from "ng-zorro-antd/form";
import { NzModalService } from "ng-zorro-antd/modal";
import { Observable } from "rxjs";
import { FileApiPath } from '../api_path/system/FileApiPath';
import { Qo } from "../entity/Qo";
import { QueryFields } from '../entity/QueryFields';
import { ObjectUtils } from "../util/ObjectUtils";
import { RequestUtil } from "../util/RequestUtil";

export abstract class BaseComponent {
    total = 1;
    dataList = [];
    loading = true;
    pageSize = 10;
    pageIndex = 1;
    isAdd = false




    public abstract saveData(data);

    public abstract getListData(param): Observable<Response | any>;

    public abstract beforeSubmitForm();

    public abstract beforeAddButton();

    public abstract onDeleteData(ids): Observable<any>

    public abstract afterLoadData();

    public abstract getSearchFields():QueryFields;
    
    public abstract initForm(data);

    constructor(public fb: FormBuilder, public modelService: NzModalService) {
        this.initSearch()
    }

   /****************************
     * *********搜索组件********
     * **************************
     */
    queryFields:QueryFields
    searchValidateForm!: FormGroup;
    showSearch=false;
    controlArray: Array<{ code: string; name: string }> = [];
    resetForm(): void {
        this.searchValidateForm.reset();
        this.listData(1, 10, null, null, null)
    }
    
    initSearch(){
        this.queryFields = this.getSearchFields()
        this.searchValidateForm = this.fb.group({});
        if(this.queryFields!==undefined&&this.queryFields!==null){
          this.showSearch==true
          this.queryFields.param.forEach((value,key)=>{
            this.controlArray.push({ code: key, name:value });
            this.searchValidateForm.addControl(key, new FormControl());
        })  
        }
    
         
      }
    
      searchData(){
          console.log(this.searchValidateForm.value)
          this.listData(1, 10, null, null, this.searchValidateForm.value)
      }

       /****************************
     * *********数据操作部分********
     * ******可选表单类型：
     * form 单页表单
     * drawer 抽屉表单
     * dialog 对话框表单
     * **************************
     */
    addData(type) {

        this.isAdd = true
        this.beforeAddButton()
        this.initForm({});
        switch(type){
            case 'form':
                this.isFormEdit=true
                break;
            case 'drawer':
                this.open()
                break;
            case 'dialog':
                this.showModal()
                break;
            default:
                break;

            
        }

       
    }
    deleteLoading = false;
    deleteData() {
        console.log("需要删除的ID", this.setOfCheckedId)
        this.modelService.confirm({
            nzTitle: '是否删除所选数据？', nzOkType: 'danger', nzOkText: '是', nzCancelText: '否', nzOkLoading: this.deleteLoading, nzOnOk: () => {
                let arr = [];
                if (ObjectUtils.isNotEmpty(this.setOfCheckedId)) {
                    this.setOfCheckedId.forEach(item => {
                        arr.push(item)
                    })
                }
                this.onDeleteData(arr).subscribe(item => {
                    if (item.code == '200') {
                        RequestUtil.notifySuccess("删除成功！")
                        this.reload()
                    }
                })
            },
        })
    }

    listData(
        pageIndex: number,
        pageSize: number,
        sortField: string | null,
        sortValue: string | null,
        searchData: { key: string; value: string }
    ): void {
        this.loading = true;
        searchData = ObjectUtils.isNotEmpty(this.searchValidateForm)? this.searchValidateForm.value:null
        let param = Qo.builder().setPage(pageIndex).setPageSize(pageSize).setSorts(sortField, sortValue).setData(searchData);
        this.getListData(param).subscribe(data => {
            this.loading = false;
            if(data.data instanceof Array){
                this.total = data.data.length;
                this.dataList = data.data;
            }else{
                this.total = data.data.total;
                this.dataList = data.data.records;
            }
             this.afterLoadData();
        });
      
    }
   
    editData(data) {
        // this.isFormEdit=true;
        this.isAdd = false
        console.log(data)
        this.initForm(data)
        this.open()
    }



    /****************************
     * *********表格选择器********
     * **************************
     */

    checked = false;
    indeterminate = false;

    setOfCheckedId = new Set<number>();

    updateCheckedSet(id: number, checked: boolean): void {
        if (checked) {
            this.setOfCheckedId.add(id);
        } else {
            this.setOfCheckedId.delete(id);
        }
    }

    onItemChecked(id: number, checked: boolean): void {
        this.updateCheckedSet(id, checked);
        this.refreshCheckedStatus();
    }

    onAllChecked(value: boolean): void {
        this.dataList.forEach(item => this.updateCheckedSet(item.id, value));
        this.refreshCheckedStatus();
    }

    onCurrentPageDataChange($event: []): void {
        this.dataList = $event;
        this.refreshCheckedStatus();
    }

    refreshCheckedStatus(): void {
        this.checked = this.dataList.every(item => this.setOfCheckedId.has(item.id));
        this.indeterminate = this.dataList.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
    }







    /****************************************************
     **************抽屉部分*******************************
     ****************************************************
     */
    isDrawerEdit = false;
    visibleDrawer = false;
    drawerWidth = "35%"
    open(): void {
        this.isDrawerEdit = true;
        this.visibleDrawer = true;
    }

    close(): void {
        this.isFormEdit = false;
        this.isDrawerEdit = false;
        this.visibleDrawer = false;
    }
    /****************************************************
      **************对话框部分****************************
      ***************************************************
     */

    isDialogVisible = false;
    isDialogOkLoading = false;

    showModal(): void {
        this.isDialogOkLoading = true;
    }

    handleOk(): void {
        this.isDialogOkLoading = true;
        setTimeout(() => {
            this.isDialogVisible = false;
            this.isDialogOkLoading = false;
        }, 3000);
    }

    handleCancel(): void {
        this.isDialogVisible = false;
    }


    /****************************************************
    **************表单编辑部分****************************
    ***************************************************
   */

    isFormEdit = false;
    validateForm!: FormGroup;
    captchaTooltipIcon: NzFormTooltipIcon = {
        type: 'info-circle',
        theme: 'twotone'
    };
  
    submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();

        }
        this.beforeSubmitForm();
        this.close();
        console.log("表单提交数据", this.validateForm.value)
        this.saveData(this.validateForm.value)
        this.reload()
    }
    reload() {
        this.listData(1, 10, null, null, null)
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



}