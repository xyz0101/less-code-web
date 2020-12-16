import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NzFormTooltipIcon } from "ng-zorro-antd/form";
import { NzModalService } from "ng-zorro-antd/modal";
import { Observable } from "rxjs";
import { Qo } from "../entity/Qo";
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

    public abstract beforeInitForm(data);

    public abstract beforeSubmitForm();

    public abstract beforeAddButton();

    public abstract onDeleteData(ids): Observable<any>


    constructor(public fb: FormBuilder, public modelService: NzModalService) {

    }
    addData() {

        this.isAdd = true
        this.beforeAddButton()
        this.initForm({});
        this.open()
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
        data: { key: string; value: string }
    ): void {
        this.loading = true;
        let param = Qo.builder().setPage(pageIndex).setPageSize(pageSize).setSorts(sortField, sortValue).setData(data);
        this.getListData(param).subscribe(data => {
            this.loading = false;
            this.total = data.data.total;
            this.dataList = data.data.records;
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
    visible = false;
    drawerWidth = "35%"
    open(): void {
        this.isDrawerEdit = true;
        this.visible = true;
    }

    close(): void {
        this.isFormEdit = false;
        this.isDrawerEdit = false;
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

    isFormEdit = false;
    validateForm!: FormGroup;
    captchaTooltipIcon: NzFormTooltipIcon = {
        type: 'info-circle',
        theme: 'twotone'
    };
    initForm(data) {

        this.beforeInitForm(data)
        this.validateForm = this.fb.group({
            id: [data.id],
            versionNumber: [data.versionNumber],
            deleteFlag: [data.deleteFlag],
            userEmail: [data.userEmail, [Validators.email, Validators.required]],
            password: [data.password, [Validators.required]],
            userName: [data.userName, [Validators.required]],
            checkPassword: [null, [Validators.required, this.confirmationValidator]],
            userCode: new FormControl({ value: data.userCode, disabled: !this.isAdd }, Validators.required),
            resetPassword: ['0', [Validators.required]],
            userIntroduce: [data.userIntroduce],
            userHead: [data.userHead],
            userStatus: [JSON.stringify(data.userStatus), [Validators.required]]
        });
    }
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