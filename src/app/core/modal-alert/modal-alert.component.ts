import { Component, Input, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogComponent, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-modal-alert',
    standalone: true,
    imports: [DynamicDialogModule, ButtonModule, DialogModule],
    providers:[DialogService],
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss']
})
export class ModalAlertComponent {
    title?: string ='Error'
    message?: string = 'An error occured'
    buttonTitle?: string = 'Close'
    type?: 'error' | 'message' | 'warning' | undefined = 'error'
    

    @ViewChild('dheader') dheader: any
    
    constructor(public dialogService: DialogService, public dialogRef:DynamicDialogRef, public config:DynamicDialogConfig) {
        
        
    }

    ngAfterViewInit() {
        this.config.templates = {
            header: this.dheader
        }
        this.config.header = undefined
        
    }

    closeButtonClicked() {
        this.dialogRef.close()
    }
    get bgColor():string {
        if (this.type==='error'){return 'bg-danger'}
        if (this.type === 'warning') { return 'bg-warning' }
        return 'bg-primary'
    }
    get buttonColor(): string {
        if (this.type==='error'){return 'btn-outline-danger'}
        if (this.type === 'warning') { return 'btn-outline-warning' }
        return 'btn-outline-primary'
    }
}
