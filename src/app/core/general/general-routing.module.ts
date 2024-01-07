import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TrialComponent } from './trial/trial.component';
import { ActivateComponent } from './activate/activate.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'trial', component: TrialComponent },
    { path: 'activate', component: ActivateComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
