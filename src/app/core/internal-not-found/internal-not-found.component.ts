import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-internal-not-found',
  standalone: true,
  imports: [],
  templateUrl: './internal-not-found.component.html',
  styleUrl: './internal-not-found.component.scss'
})
export class InternalNotFoundComponent {
    constructor(public acRoute: ActivatedRoute) {
        let error = acRoute.snapshot.queryParams['error']
        if (error === 'noAdmin') {
            this.error = 'You do not have administrator privileges.'
            this.status = '403 - Forbidden' 
        } else {
            let paths = this.acRoute.snapshot.url.map(v => v.path).join('/')
            paths = '/' + paths
            this.error = `The path ${paths} was not found.`
            this.status = '404 - Not Found'
        }
    }
    error:string
    status:string
   
}   
