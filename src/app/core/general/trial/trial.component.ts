import { Component } from '@angular/core';
import { LogoComponent } from '../../small/logo/logo.component';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { NetworkService } from 'src/app/core/service/network.service';
import { StoreService } from 'src/app/core/service/store.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SCValidators } from '../../validators/sc-validators';
import { ErrorDialogComponent } from '../../small/error-dialog/error-dialog.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import {  ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import {  } from '@angular/common/http';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-trial',
  standalone: true,
  imports: [LogoComponent, ReactiveFormsModule, ErrorDialogComponent, CheckboxModule, DialogModule, RouterModule, ButtonModule, RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './trial.component.html',
  styleUrl: './trial.component.scss'
})
export class TrialComponent {
    
    error: any
    feedback = false
    get emailError(){return SCValidators.requiredEmailError(this.trialForm.get('email')!, this.feedback) }
    get agreeError(){return this.trialForm.value.agreeToTermsAndConditions || !this.feedback ? undefined : 'This is required' }
    get recaptchaError(){return this.trialForm.value.captcha?.length || !this.feedback ? undefined : 'This is required' }
    
    termsText:string[] = []
    constructor(public router: Router,  private http: HttpClient, public network:NetworkService,
        public fb: FormBuilder) {
        
        http.get('assets/core/terms_and_conditions.txt', { responseType: 'text' }).subscribe({
            next: (value: string) => {
                this.termsText = value.split('\n')
            }
        })
    }
    
    trialForm = this.fb.group({
        email: [window.localStorage.getItem('email') ?? '', SCValidators.requiredEmailValidator()],
        agreeToTermsAndConditions: [false, Validators.requiredTrue],
        captcha: ['', SCValidators.requiredString(5)]
    })
    submit() {
        this.feedback = true
        if (this.trialForm.valid) {
            window.localStorage.setItem('email',this.trialForm.value.email ?? '')
            this.network.post('/signup', this.trialForm.value).subscribe({
                next: (v) => this.router.navigate(['/general/activate']),
                error: e=>this.error=e
            })
        }
    
    }

    agreeModalVisible = false    
    agreeClicked() {
        this.agreeModalVisible=true
    }
    termsAgreed() {
        this.trialForm.get('agreeToTermsAndConditions')?.setValue(true)
        this.agreeModalVisible=false
    }
    termsCanceled() {
        this.trialForm.get('agreeToTermsAndConditions')?.setValue(false)
        this.agreeModalVisible=false

    }
    
}
