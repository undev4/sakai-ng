import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { NetworkService } from 'src/app/core/service/network.service';
import { StoreService } from 'src/app/core/service/store.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppTopBarComponent } from 'src/app/layout/app.topbar.component';

@Component({
  selector: 'app-site-settings',
  standalone: true,
  imports: [AppTopBarComponent, CommonModule, TabMenuModule, BadgeModule, FaIconComponent],
  templateUrl: './site-settings.component.html',
  styleUrl: './site-settings.component.scss'
})
export class SiteSettingsComponent {

    constructor(public router:Router, public activatedRoute: ActivatedRoute, public layoutService: LayoutService , public storeService: StoreService){}
    items: MenuItem[] = []
    activeItem?:MenuItem
    
    ngOnInit() {
        this.items = [
            { label: 'Main Info', icon: 'pi pi-fw pi-info' },
            { label: 'Labels', icon: 'pi pi-fw pi-tag' },
            { label: 'Work Days', icon: 'pi pi-fw pi-calendar' },
            { label: 'Holidays', icon: 'pi pi-fw pi-flag' },
            { label: 'Time Off Categories', icon: 'pi pi-fw pi-check-square' },
        ];

        this.activeItem = this.items[0];
    }

}
