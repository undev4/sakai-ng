import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class SCValidators{
    static requiredEmailValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (typeof control.value === 'string' && control.value.length) {
                if (this.validEmail(control.value)) {
                    return null
                }
                return {'properEmail':true};
            }
            return {'requiredEmail':true}
        };
    }
    static requiredEmailError(control: AbstractControl, feedback:boolean): string | undefined {
        if (control.valid || ! feedback) { return undefined }
        if (control.errors?.['requiredEmail']){return 'Email is required.'}
        if (control.errors?.['properEmail']) { return 'Email is not valid.' }
        return undefined
    }
    
    static validEmail(inputText: string): boolean {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let m = inputText.match(mailformat)
        let r = m ? true : false
        return r
    }
    static requiredString(minLength: number): ValidatorFn{
        return  (control: AbstractControl): { [key: string]: boolean } | null => {
            if (typeof control.value === 'string' && control.value.length >= minLength) {
                return null
            }
            if (typeof control.value === 'string' && control.value.length) {
                return {'minLength':true}
            }

            return {'required':true}
        };
    }
    static requiredStringError(control: AbstractControl, feedback:boolean): string | undefined {
        if (control.valid || ! feedback) { return undefined }
        if (control.errors?.['requiredString']){return 'This is required.'}
        return undefined
    }
    static passwordValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            if (!control.value || typeof control.value !== 'string') {
                return { 'length': true, 'uppercase': true, 'lowercase': true }
            }
            let result: { [key: string]: boolean } = {}
            let e=false
            if (control.value.length < 8) {
                result['length'] = true
                e=true
            }
            if (control.value === control.value.toLocaleLowerCase()) {
                result['uppercase'] = true
                e=true

            }
            if (control.value === control.value.toLocaleUpperCase()) {
                result['lowercase'] = true
                e=true
            }
            return e ? result : null            
            
        };
    }
    static equalPasswordsValidator(): ValidatorFn{
        return (control:AbstractControl): ValidationErrors | null => {
            const pass = control.get('password');
            const confirm = control.get('confirmPassword');
          
            return pass?.value !== confirm?.value 
              ? { passwordsNotIdentical: true }
              : null;
          };
    }
}