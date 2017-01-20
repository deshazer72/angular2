import { Component, OnInit } from '@angular/core';
import { videoService } from './video-form.service';



@Component({
    selector: 'video-view',
      templateUrl: './app/video-view.component.html',
    providers: [videoService],
    styleUrls: ['./app/video-view.component.css']
})

export class VideoViewComponent implements OnInit {
    public videoNames: Array <>;  
    constructor(private _videoService: videoService) {
        this.videoNames = []; 
    }


    ngOnInit() {
        this._videoService.getJsonData().subscribe(res => {
            // console.log(res); 
           // let strVideoName: String[];
           
            for (var i = 0; i < res.SopVideo.length; i++){
                 var name = res.SopVideo[i]; 
                 this.videoNames.push(name[0].Name); 
            }
           
            
     
    }); 



}
