import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { InternalNotFoundComponent } from '../internal-not-found/internal-not-found.component';

const routes: Routes = [
    { path: 'profile', component: ProfileComponent },
    { path: 'notfound', component: InternalNotFoundComponent },
    { path: '**', component: InternalNotFoundComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
