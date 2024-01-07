import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SiteSettingsComponent } from './site-settings/site-settings.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
      AdminRoutingModule,
    SiteSettingsComponent
  ]
})
export class AdminModule { }
