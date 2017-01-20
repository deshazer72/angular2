import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
   template: `
    <nav>
    <ul>
      <li><a routerLink="/video-view" routerLinkActive="active">View Videos</a></li>
      <li><a routerLink="/upload-video" routerLinkActive="active">Upload Videos</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [ `ul { list-style-type: none; margin: 0; padding: 0; overflow: hidden; background-color: #333; } 
 li { float: left; } li a { display: block; color: white; text-align: center; padding: 14px 16px; text-decoration: none; } 
 li a:hover {background-color: #111;}`]
})
export class AppComponent  { name = 'Angular'; }
