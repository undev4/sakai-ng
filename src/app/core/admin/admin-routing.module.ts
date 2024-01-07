import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { InternalNotFoundComponent } from '../internal-not-found/internal-not-found.component';
import { SiteSettingsComponent } from './site-settings/site-settings.component';

const routes: Routes = [
    { path: '', component: AdminComponent },
    {path:'settings', component:SiteSettingsComponent},
    { path: '**', component: InternalNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
