import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './layout/service/app.layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, public layoutService:LayoutService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;

        let theme = window.localStorage.getItem('theme') ?? 'lara-dark-teal'
        this.layoutService.config.update((config) => ({ ...config, theme:theme,colorScheme:'dark' }));


    }
}
