import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { NetworkService } from 'src/app/core/service/network.service';
import { StoreService } from 'src/app/core/service/store.service';
import { ErrorDialogComponent } from '../../small/error-dialog/error-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ErrorDialogComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    constructor(public router: Router, public activatedRoute: ActivatedRoute, public layoutService: LayoutService, public storeService: StoreService) {
        let params=activatedRoute.snapshot.queryParams['error']
        if(params === 'noAdmin'){this.error = 'You do not have administrator privileges.'}
    }
    error:any
}
