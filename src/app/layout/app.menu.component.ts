import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { StoreService } from '../core/service/store.service';
import { NetworkService } from '../core/service/network.service';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../core/small/error-dialog/error-dialog.component';
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    error:any

    model: any[] = [];

    constructor(public layoutService: LayoutService, private store:StoreService, public network:NetworkService, public router:Router) { }

    ngOnInit() {
        let ax = [this.homeElements]
        if (this.store.userPrivileges.isAdmin) { ax.push(this.adminElements) }
        
        ax.push(this.logoutElements)
        this.model=ax
    }


    get homeElements(): any{
        return {
            label: 'Home',
            items: [
                { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: ['/layout/user/profile'] },
                { label: 'Posted', icon: 'pi pi-fw pi-table', routerLink: ['/layout/user/posted'] }
            ]
        }
    }
    get  adminElements():any {
        return {
            label: 'Administration',
            items: [
                { label: 'Account', icon: 'pi pi-fw pi-id-card', routerLink: ['/layout/admin/account'] },
                { label: 'Site Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/layout/admin/settings'] },
                { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['/layout/admin/users'] },
                { label: 'Changes', icon: 'pi pi-fw pi-arrow-right-arrow-left', routerLink: ['/layout/admin/changes'] },
                { label: 'Emails', icon: 'pi pi-fw pi-envelope', routerLink: ['/layout/admin/emails'] },
                { label: 'Reports', icon: 'pi pi-fw pi-clone', routerLink: ['/layout/admin/reports'] },
                { label: 'Groups', icon: 'pi pi-fw pi-qrcode', routerLink: ['/layout/admin/groups'] },
            ]
        }
    }

    get logoutElements(): any{
        return {
            label: 'Logout',
            items: [
                {
                    label: 'Logout', icon: 'pi pi-fw pi-power-off', command: (evt:any) => {
                        console.log('logout')
                        this.network.post('logout', {}).subscribe({
                            next: (v) => {
                                this.store.userPrivileges = {}
                                this.router.navigate(['/general/login'])
                            },error:e=>this.error=e
                            
                        })
                    }
                },
            ]
        }
    }
}
