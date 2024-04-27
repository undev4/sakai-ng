import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../core/small/logo/logo.component';
import { StoreService } from '../core/service/store.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    standalone: true,
    imports:[CommonModule, LogoComponent]
})
export class AppTopBarComponent implements AfterViewInit, OnDestroy{
    
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, public store: StoreService) { }

    settingsClicked() {
        this.layoutService.showConfigSidebar()
    }
    ngAfterViewInit(): void {
        this.store.appTopBar = this
    }
    ngOnDestroy(): void {
        this.store.appTopBar=undefined
    }
}
