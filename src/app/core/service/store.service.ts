import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

    userPrivileges: UserPriviliges = {}
    
    constructor() { }



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

