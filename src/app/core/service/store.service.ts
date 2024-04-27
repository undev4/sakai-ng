import { EventEmitter, Injectable, Output } from '@angular/core';
import { AppTopBarComponent } from 'src/app/layout/app.topbar.component';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

    userPrivileges: UserPriviliges = {}
    
    constructor() { }

    appTopBar?:AppTopBarComponent

}

export interface UserPriviliges{
    isMaster?: boolean
    isAdmin?: boolean
    isMember?: boolean
    isManager?: boolean
    email?: string
    siteName?:string
    groupName?:string
}

