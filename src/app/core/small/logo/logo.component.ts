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
    @Input() iconClass = ''
    @Input() textClass = 'text-3xl' 
    @Input() link = '/' 
    constructor( public activatedRoute:ActivatedRoute, public layoutService: LayoutService){}

   
}
