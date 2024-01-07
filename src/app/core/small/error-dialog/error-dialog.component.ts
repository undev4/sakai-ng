import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [DialogModule, RouterModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent implements OnChanges {
    constructor(public router:Router){} 
    
    @Input() errHeader = 'Error'
    @Input() error: any
    
    errorText = ''
    status = 0

    get visible(): boolean{return this.error ? true : false}
    set visible(value){if(!value) this.error = undefined}

    ngOnChanges(changes: SimpleChanges): void {
        if(!this.error){return}
        let es = "Unknown Error"
        let error=this.error
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
        
        if (error.status) { this.status = error.status }
        this.errorText=es

    }
    onHide() {
        if (this.status == 504) {
            this.router.navigate(['/general/login'],{queryParams:{reason:'error'}}).then(v=>console.log(v))
        }
        if (this.errorText.startsWith( "Your session has timed out because of inactivity") ){
            this.router.navigate(['/general/login'],{queryParams:{reason:'noActivity'}}).then(v=>console.log(v))
        }
    }

}
