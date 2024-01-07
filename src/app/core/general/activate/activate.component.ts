import { Component } from '@angular/core';
import { LogoComponent } from '../../small/logo/logo.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/core/service/store.service';
import { SCValidators } from '../../validators/sc-validators';
import { PasswordModule } from 'primeng/password';
import { NetworkService } from '../../service/network.service';
import { ErrorDialogComponent } from '../../small/error-dialog/error-dialog.component';

@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [CommonModule, LogoComponent, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, PasswordModule, ErrorDialogComponent],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})
export class ActivateComponent {
    constructor(public router: Router, public storeService: StoreService, public fb: FormBuilder, public network:NetworkService) { }
    
    activateForm = this.fb.group({
        email: [window.localStorage.getItem('email') ?? '', SCValidators.requiredEmailValidator()],
        password:['', SCValidators.passwordValidator()],
        confirmPassword: [''],
        code: ['', SCValidators.requiredString(10)],
        
    }, {validators:SCValidators.equalPasswordsValidator()})

    feedback = false
    error:any
    submit() {
        this.feedback = true
        if (this.activateForm.valid) {
            this.showingPass = false
            setTimeout(() => {
                let v: any = this.activateForm.value
                v.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                this.network.post('sites', v).subscribe({
                    next: (v) => this.router.navigate(['general/login']),
                    error:e=>this.error=e
                })
            
            },200)
            
        }
    }
    
    showingPass=false
    get passIconClass() {
        return this.showingPass ? 'pi-eye-slash' :'pi-eye'
    }
    get passFieldType(){
        return this.showingPass ? 'text' : 'password'
    }
    togglePassVisibility() {
        this.showingPass = ! this.showingPass
    }


    showPassCriteria = false
    
    lengthErrClass(key:string) {
        if (this.activateForm.get('password')?.errors?.[key]) { return 'pi p-error pi-times-circle mr-3' } 
        return 'pi text-green-500 pi-check-circle mr-3'
    }
    get codeError():string | undefined {
        if(!this.feedback){return undefined}
        if (this.activateForm.get('code')?.errors?.['required']) { return 'This is required.' }
        if (this.activateForm.get('code')?.errors?.['minLength']) { return 'Proper code is required.' }
        return undefined
    }
    get passwordError():string | undefined {
        if(!this.feedback){return undefined}
        if (this.activateForm.get('password')?.errors) { return 'Password is not valid.' }
        return undefined
    }
}
