import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
    styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {
    constructor(public layoutService: LayoutService) {
    }

    get dark(): boolean{
        return this.layoutService.config().colorScheme ==='dark'
    }
}