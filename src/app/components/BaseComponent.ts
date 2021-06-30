import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NzFormTooltipIcon } from "ng-zorro-antd/form";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { Observable } from "rxjs";
import { FileApiPath } from '../api_path/system/FileApiPath';
import { Qo } from "../entity/Qo";
import { QueryFields } from '../entity/QueryFields';
import { ObjectUtils } from "../util/ObjectUtils";
import { RequestUtil } from "../util/RequestUtil";
import { ButtonCodes } from './ButonCodes';

export abstract class BaseComponent extends ButtonCodes{

    fileUploadPath = FileApiPath.UPLOAD_FILE_PATH
    total = 1;
    dataList = [];
    loading = false;
    pageSize = 10;
    pageIndex = 1;
    isAdd = false
    editTable=[]
    /**
     * 编辑类型，dialog ，form，drawer
     */
    editType;


  
    /**
     * 获取当前列表的查询结果
     * @param param 参数
     */
    public abstract getListData(param): Observable<Response | any>;
  

    /**
     * 当进行数据删除的时候的回调
     * 可以调接口
     * @param ids 
     */
    public abstract onDeleteData(ids): Observable<any>
    /**
     * 列表数据加载完成的回调
     * 可以修改数据什么的
     */
    public abstract afterLoadData();
    /**
     * 构建当前查询组件的列
     */
    public abstract getSearchFields():QueryFields;



    /**
     * drawer类型创建空表单执行之前的操作
     */
    beforeDrawerAddButton() {
        throw new Error('Method not implemented.');
    }
    /**
     * dialog 类型创建空表单执行之前的操作
     */
    beforeDialogAddButton(){
        throw new Error('Method not implemented.');
    }
    /**
     * form 类型创建空表单执行之前的操作
     */
    beforeFormAddButton() {
        throw new Error('Method not implemented.');
    }
    /**
     * drawer类型创建表单的操作
     * @param data 
     */
    initDrawerEditForm(data: any) {
        throw new Error('Method not implemented.');
    }
    /**
     *  dialog类型创建表单的操作
     */
    initDialogEditForm(data: any) {
        throw new Error('Method not implemented.');
    }
    /**
     *  form类型创建表单的操作
     * @param data 
     */
    initFormEditForm(data: any) {
        throw new Error('Method not implemented.');
    }
    /**
     * form 类型 表单提交前操作
     */
    beforeFormSubmit() {
        throw new Error('Method not implemented.');
    }
     /**
     * dialog 类型 表单提交前操作
     */
    beforeDialogSubmit() {
        throw new Error('Method not implemented.');
    }
     /**
     * drawer 类型 表单提交前操作
     */
    beforeDrawerSubmit() {
        throw new Error('Method not implemented.');
    }

    saveDrawerData(data: any) :Observable<any> {
        throw new Error('Method not implemented.');
    }
    saveDialogData(data: any)  :Observable<any>{
        throw new Error('Method not implemented.');
    }
    saveFormData(data: any)  :Observable<any>{
        throw new Error('Method not implemented.');
    }


  

    /**
     * 验证表单，如果不通过会抛异常
     */
    validataFormAndTrowError(){
        console.log('验证表单',this.validateForm.value)
        console.log(this.validateForm.status)
        if(this.validateForm.status=='INVALID'){
            RequestUtil.notifyError('表单验证不通过！请检查表单')
        throw new Error('表单验证不通过');
        }
    }
    


  /**
     * 保存数据的操作，调接口
     * @param data 
     */
    public saveData(data) :Observable<any>{
        if(this.editType=='form'){
            return this.saveFormData(data)
        }else  if(this.editType=='dialog'){
            return this.saveDialogData(data)
        }else if(this.editType=='drawer'){
            return this.saveDrawerData(data)
        }
    }
   


  /**
     * 提交表单之前的操作
     */
    public   beforeSubmitForm(){
        if(this.editType=='form'){
            this. beforeFormSubmit()
        }else  if(this.editType=='dialog'){
          this.beforeDialogSubmit()
        }else if(this.editType=='drawer'){
            this.beforeDrawerSubmit()
        }
    }
 

        /**
     * 添加按钮之前的操作
     */
    public  beforeAddButton(){
        if(this.editType=='form'){
            this. beforeFormAddButton()
        }else  if(this.editType=='dialog'){
          this.beforeDialogAddButton()
        }else if(this.editType=='drawer'){
            this.beforeDrawerAddButton()
        }
    }
    drawerFormLoading = false
    /**
     * 初始化表单数据
     * @param data 
     */
    public  initForm(data){
        this.drawerFormLoading = true;
        if(this.editType=='form'){
            this.initFormEditForm(data)
        }else  if(this.editType=='dialog'){
          this.initDialogEditForm(data)
        }else if(this.editType=='drawer'){
            this.initDrawerEditForm(data)
        }
        this.drawerFormLoading = false;
    }
   



    constructor(public fb: FormBuilder, public modelService: NzModalService) {
        super()
        this.initSearch()
        
    }

       /****************************
     * *********表格操作********
     * **************************
     */
    /**
     * 表格新增一行
     */
    addTableRow(){
        let id = new Date().getTime()
        this.editTable = [
            ...this.editTable,
            {id:id }
        ]
        
        
    }
    /**
     * 
     * @param id 删除行
     */
    deleteTableRow(id){
        this.editTable = this.editTable.filter(d => d.id !== id);
    }


    deleteSingleData(id){
        this.setOfCheckedId = new Set();
        this.setOfCheckedId.add(id);
        console.log("需要删除的ID", this.setOfCheckedId)
        if(!this.setOfCheckedId||this.setOfCheckedId.size==0){
            RequestUtil.notifyError('请选择需要删除的数据')
            return
        }
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
        this.pageIndex=1
        this.pageSize=10
        this.listData(1, 10, null, null, null)
    }
    
    initSearch(){
        this.queryFields = this.getSearchFields()
        this.searchValidateForm = this.fb.group({});
        if(this.queryFields!==undefined&&this.queryFields!==null){
          this.showSearch==true
          console.log('showSearch')
          this.queryFields.param.forEach((value,key)=>{
            this.controlArray.push({ code: key, name:value });
            this.searchValidateForm.addControl(key, new FormControl());
        })  
        
        }
    
         
      }
    
      searchData(){
          this.pageIndex = 1;
          this.pageSize=10;
          this.listData(1, 10, 'lastUpdateDate', 'descend', this.searchValidateForm.value)
      }


      /**
       * 创建空表单，添加数据
       * @param type 
       */
      createData(type){
        this.editType = type;
        this.isAdd = true
        this.beforeAddButton()
        this.initForm({});
        this.openEditView(type);
      }

       /****************************
     * *********数据操作部分********
     * ******可选表单类型：
     * form 单页表单
     * drawer 抽屉表单
     * dialog 对话框表单
     * **************************
     */
    
    openEditView(type: any) {
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

  closeEditView(type: any) {
        switch(type){
            case 'form':
                this.isFormEdit=false
                break;
            case 'drawer':
                this.close()
                break;
            case 'dialog':
                this.handleCancel()
                
                break;
            default:
                break;

            
        }
    }


    
    deleteLoading = false;
    /**
     * 批量删除数据
     */
    deleteData() {
        console.log("需要删除的ID", this.setOfCheckedId)
        if(!this.setOfCheckedId||this.setOfCheckedId.size==0){
            RequestUtil.notifyError('请选择需要删除的数据')
            return
        }
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
    /**
     * 删除单条数据
     */
    deleteThis(id) {
        console.log("需要删除的ID",id)
        if(!id){
            RequestUtil.notifyError('请选择需要删除的数据')
            return
        }
        this.modelService.confirm({
            nzTitle: '是否删除当前数据？', nzOkType: 'danger', nzOkText: '是', nzCancelText: '否', nzOkLoading: this.deleteLoading, nzOnOk: () => {
                let arr = [];
                arr.push(id)
                this.onDeleteData(arr).subscribe(item => {
                    if (item.code == '200') {
                        RequestUtil.notifySuccess("删除成功！")
                        this.reload()
                    }
                })
            },
        })
    }

    onTableLoad(params: NzTableQueryParams){
        console.log(params);
        const { pageSize, pageIndex, sort, filter } = params;
        
        let currentSort = sort.find(item => item.value !== null);
        if(!currentSort){
            currentSort={key:'lastUpdateDate',value:'descend'}
        }
        const sortField = (currentSort && currentSort.key) || null;
        const sortOrder = (currentSort && currentSort.value) || null;
        this.listData(pageIndex, pageSize, sortField, sortOrder,null );
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
        let res = this.getListData(param)
        if(res==null) return
        res.subscribe(data => {
            
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
    /**
     * 编辑数据，表单数据引用现有数据
     */
    editData(data,type) {
        
        this.editType = type;
        this.isAdd = false
        console.log(data)
        this.initForm(data)
        this.openEditView(type)
    }



    /****************************
     * *********表格选择器********
     * **************************
     */

    checked = false;
    indeterminate = false;
    /**
     * 当前选择了的id
     * 用于删除或者其他
     * 单个删除的时候这里面只有一个元素
     */
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
        this.isDialogVisible = true;
    }

    handleOk(): void {
        this.isDialogOkLoading = true;
        this.submitForm()
    }

    handleCancel(): void {
        this.isDialogVisible = false;
        this.isDialogOkLoading=false
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
       
        console.log("表单提交数据", this.validateForm.value)
        this.saveData(this.validateForm.value).subscribe(item=>{
            if(item.code=='200'){
                RequestUtil.notifySuccess( "提交成功")
                this.closeEditView(this.editType);
                this.reload()
              }
              this.afterSubmitForm(item.data);
              
        })
        
    }
    afterSubmitForm(data) {
        throw new Error("Method not implemented.");
    }
    reload() {
        this.listData(1, this.pageSize, null, null, null)
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