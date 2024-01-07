import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { Router, RouterModule } from '@angular/router';
import { NetworkService } from 'src/app/core/service/network.service';
import { StoreService } from 'src/app/core/service/store.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogoComponent } from '../../small/logo/logo.component';
import { SCValidators } from '../../validators/sc-validators';
import { ModalService } from '../../service/modal.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ErrorDialogComponent } from '../../small/error-dialog/error-dialog.component';
import { er } from '@fullcalendar/core/internal-common';
import { DialogModule } from 'primeng/dialog';
//import { Utils } from 'src/app/utils';

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [CommonModule, DialogModule ,InputTextModule, ButtonModule, CheckboxModule, ReactiveFormsModule, RouterModule, PasswordModule, LogoComponent,ErrorDialogComponent],
    providers:[DialogService, ModalService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    constructor(public router: Router, public store: StoreService, public network: NetworkService, public layoutService: LayoutService, public fb: FormBuilder,
        
    ) { }
    
    loginForm = this.fb.group({
        email: [window.localStorage.getItem('email') ?? '',  SCValidators.requiredEmailValidator()],
        password: ['', SCValidators.requiredString(1)],
        rememberMe:[true]
    })
    feedback = false
    error: any
    chooseASiteVisible = false;
    response?: LoginResponse
    
    
    get passwordError(): string | undefined{
        return this.loginForm.get('password')?.errors?.['required'] ? 'Password is required' : undefined
    }
    get emailError(): string | undefined{
        let req = this.loginForm.get('email')?.errors?.['requiredEmail'] 
        if (req){return 'Email is required'}

        let proper = this.loginForm.get('email')?.errors?.['properEmail'] 
        if (proper){return 'Email is not valid'}
        return undefined
    }

    multiRef?:DynamicDialogRef
    submit() {
        this.feedback = true
        if (this.loginForm.valid){
            window.sessionStorage.setItem('email', this.loginForm.value.email ?? '')
            let data = this.loginForm.value
            this.network.post<LoginResponse>('/login', data).subscribe({
                next: (response) => {
                    localStorage.setItem('email', this.loginForm.value.email ?? '')
                    if (response.multi) {
                        this.response = response
                        this.chooseASiteVisible = true
                    }//end if response.multi
                    else {
                        console.log('user logged in')
                        setTimeout(() => { this.router.navigate(['/layout/user/profile']) }, 100)
                    }
                },
                error: (error) => {
                    this.error = error //  this.modalService.showError('Login Error', error)
                }
            })
        }
    }
    siteSelected(site: OutLoginSite) {
        this.network.post('/login/multi', { siteId: site.uid, token: this.response?.token, email: this.loginForm.value.email })
            .subscribe({
                next: (v) => this.router.navigate(['/layout/user/profile']),
                error: (e) => this.error = e
            })
    }
}


interface LoginResponse{
    multi: boolean
    sites: OutLoginSite[]
    token: string
}
export interface OutLoginSite{
    uid:string
    name?: string
    abbreviation:string
}