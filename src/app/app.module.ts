import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { ProductService } from './core/service/product.service';
import { CountryService } from './core/service/country.service';
import { CustomerService } from './core/service/customer.service';
import { EventService } from './core/service/event.service';
import { IconService } from './core/service/icon.service';
import { NodeService } from './core/service/node.service';
import { PhotoService } from './core/service/photo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { LogoComponent } from './core/small/logo/logo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        PasswordModule,
        CheckboxModule,
        LogoComponent,
        FontAwesomeModule

    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy  },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
