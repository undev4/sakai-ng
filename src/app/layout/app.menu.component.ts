import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model=[this.homeElements, this.adminElements]
    }

    get  adminElements():any {
        return {
            label: 'Administration',
            items: [
                { label: 'Account', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/account'] },
                { label: 'Site Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/admin/settings'] },
                { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['/admin/users'] },
                { label: 'Changes', icon: 'pi pi-fw pi-arrow-right-arrow-left', routerLink: ['/admin/changes'] },
                { label: 'Emails', icon: 'pi pi-fw pi-envelope', routerLink: ['/admin/emails'] },
                { label: 'Reports', icon: 'pi pi-fw pi-clone', routerLink: ['/admin/reports'] },
                { label: 'Groups', icon: 'pi pi-fw pi-qrcode', routerLink: ['/admin/groups'] },
            ]
        }
    }

    get homeElements(): any{
        return {
            label: 'Home',
            items: [
                { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: ['/user/profile'] },
                { label: 'Posted', icon: 'pi pi-fw pi-table', routerLink: ['/user/posted'] }
            ]
        }
    }
}
