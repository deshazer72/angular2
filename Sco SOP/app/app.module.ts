import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'; 
import { HttpModule } from '@angular/http'; 
import { RouterModule, Routes } from '@angular/router'; 

import { AppComponent }  from './app.component';
import {VideoFormComponent} from './video-form.component'; 
import { DatePickerModule } from 'ng2-datepicker'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { VideoViewComponent } from './video-view.component'; 


const appRoutes: Routes = [ 
  {path: 'video-view', component: VideoViewComponent}, 
  {path: 'upload-video', component: VideoFormComponent}
]; 


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, DatePickerModule, RouterModule.forRoot(appRoutes)
  ],
  declarations: [ AppComponent, VideoFormComponent, VideoViewComponent],
  bootstrap:    [ AppComponent ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class AppModule { }
