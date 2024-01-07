import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppTopBarComponent } from 'src/app/layout/app.topbar.component';

@Component({
  selector: 'app-site-settings',
  standalone: true,
  imports: [AppTopBarComponent, CommonModule, TabMenuModule, BadgeModule],
  templateUrl: './site-settings.component.html',
  styleUrl: './site-settings.component.scss'
})
export class SiteSettingsComponent {

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
