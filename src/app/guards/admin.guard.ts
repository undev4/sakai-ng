import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StoreService } from '../core/service/store.service';

export const AdminGuard: CanActivateFn = (route, state) => {
    const store = inject(StoreService)
    const router = inject(Router)
    if (store.userPrivileges.isAdmin) {
        return true
    } else {
        return router.createUrlTree(['/layout/user/notfound'],{queryParams:{error:'noAdmin'}})
    }

};
