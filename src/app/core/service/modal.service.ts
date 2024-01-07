import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalAlertComponent } from '../modal-alert/modal-alert.component';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

    constructor(public dialogService: DialogService, public router: Router) { }
    
   get primeService() {return this.dialogService}

    errorAlert?:DynamicDialogRef
    showError(title: string, error: any) {
        let es = "Unknown Error"
        let status = -1
        if (error) {
            if (typeof error == 'string') {
                es=error
            } else {
                let m = error.error
                if (m) {
                    if (typeof m == 'string') {
                        es=m
                    } else {
                        let r = m.reason
                    if (typeof r == 'string') { es = r }
                    }
                } else {
                    let code = error.code
                    if (code) {es =`Code ${code}`}
                }
            }
        }
        if (es == 'Unknown Error') { console.log(es); console.log( JSON.stringify(error))}
        
        let data: any = { message: es, title: title, type: 'error' } 

        if (error.status) { status = error.status }
        let config:DynamicDialogConfig={
            width: '500px',
            modal: true,
            data:data
        }
        
        if (status==504 ){data.buttonTitle='Login Page'}
        if (es.startsWith( "Your session has timed out because of inactivity")) { data.buttonTitle = 'Login' }
        
        this.errorAlert = this.dialogService.open(ModalAlertComponent, config)
        if (status == 504) {
            this.errorAlert.onClose.subscribe({
                next: response => this.router.navigate(['/general/login'],{queryParams:{reason:'error'}})})
        }
        if (es.startsWith( "Your session has timed out because of inactivity") ){
            this.errorAlert.onClose.subscribe({
                next: response => this.router.navigate(['login'],{queryParams:{reason:'noActivity'}})})
        }
    }
    showMessage(title:string, message: string,routeToLogin:boolean  = false) {
        
        var data: any = { message: message, title: title, type: 'message' } 
        if (routeToLogin){data.buttonTitle='Login'}
        this.errorAlert = this.dialogService.open(ModalAlertComponent, { data })
       if (routeToLogin){
            this.errorAlert.onClose.subscribe({
                next: response => this.router.navigate(['login'],{queryParams:{reason:'none'}})})
        }
    }
}
