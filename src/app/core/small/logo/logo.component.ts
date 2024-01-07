import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { NetworkService } from 'src/app/core/service/network.service';
import { StoreService } from 'src/app/core/service/store.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
    @Input() divClass = ''
    @Input() logoText = 'Schedulai'
    @Input() size :'small' | 'medium' | 'large' = 'medium'
    @Input() link = '/' 
    constructor( public activatedRoute:ActivatedRoute, public layoutService: LayoutService){}

    get logoClass() {
        switch (this.size) {
            case 'large': return 'mr-3 w-3rem'
            case 'medium': return 'mr-2 w-2rem'
            case 'small': return 'mr-1 w-1rem'
        }
    }
    get textClass() {
        switch (this.size) {
            case 'large': return 'text-5xl'
            case 'medium': return 'text-3xl'
            case 'small': return 'xl'
        }
    }
}
