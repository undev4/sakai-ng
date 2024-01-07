import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { NetworkService } from '../core/service/network.service';
import { StoreService } from '../core/service/store.service';
import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EAccentColor, ELoginStatus } from '../types';


export const LoggedInGuard: CanActivateFn = (route, state) => {
    const router = inject(Router)
    const network = inject(NetworkService)
    const store = inject(StoreService)
    
    let stat: Observable<boolean | UrlTree> = network.get<LoginStatusResponse>('/login-status').pipe(
        map((value) => {
            console.log(`log in status in logged in guard = ${value}`)
            store.userPrivileges = value.privileges
            return value.status == 'loggedIn' ?  true : router.createUrlTree(['general/login'],{queryParams:{status:value.status}})
        })
    )
    return stat
}

export interface LoginStatusResponse{
    status: ELoginStatus
    accentColor: EAccentColor
    privileges:Privileges
}
export interface Privileges{
    isMaster?: boolean
    isManager: boolean
    isAdmin: boolean
    isMember: boolean
}