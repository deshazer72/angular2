import { Component, OnInit } from '@angular/core';
import { videoService } from './video-form.service';
import { Sop } from './Sop.interface';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';


@Component({
    moduleId: module.id,
    selector: 'video-form',
    templateUrl: './video-form.component.html',
    providers: [videoService],
    styleUrls: ['./video-form.component.css']
})

export class VideoFormComponent implements OnInit {
    public loading: boolean; 
    private today = new Date();
    private dd: any = this.today.getDate();
    private mm: any = this.today.getMonth() + 1;
    private year: any = this.today.getFullYear();

    public sop: Sop;
    public dateExpires: any;

    public dateAvaliable: any;

    public countrys = [
        { value: 'US', display: 'US', isChecked: false },
        { value: 'UK', display: 'UK', isChecked: false },
        { value: 'JP', display: 'JP', isChecked: false },
        { value: 'CA', display: 'CA', isChecked: false },
        { value: 'All', display: 'All', isChecked: true }
    ];
    public storeTypes = [
        { value: 'Super Center', display: 'Super Center', isChecked: false },
        { value: 'Division', display: 'Division', isChecked: false },
        { value: 'Neighborhood Market', display: 'Neighborhood Market', isChecked: false },
        { value: 'Sams', display: 'Sams', isChecked: false },
        { value: 'All', display: 'All', isChecked: true }
    ];

    public scoTypes = [
        { value: 'NCR-R4', display: 'NCR-R4', isChecked: false },
        { value: 'NCR-R5', display: 'NCR-R5', isChecked: false },
        { value: 'NCR-R6', display: 'NCR-R6', isChecked: false },
        { value: 'TGCS-V5', display: 'TGCS-V5', isChecked: false },
        { value: 'TGCS-V6', display: 'TGCS-V6', isChecked: false },
        { value: 'WiSco', display: 'WiSco', isChecked: false },
        { value: 'All', display: 'All', isChecked: true }
    ];
    public audiences = [
        { value: 'CSM', display: 'CSM', isChecked: false },
        { value: 'Sco Host', display: 'Sco Host', isChecked: false },
        { value: 'All', display: 'All', isChecked: true }
    ];
    public sopTypes = [
        { value: 'How to fix', display: 'How to fix', isChecked: false },
        { value: 'NCR how to operate', display: 'NCR how to operate', isChecked: false },
        { value: 'All', display: 'All', isChecked: true },
    ];
    ngOnInit() {
        if (this.dd < 10) {
            this.dd = '0' + this.dd;
        }
        if (this.mm < 10) {
            this.mm = '0' + this.mm;
        }
        this.sop = {
            description: "",
            country: [this.countrys[4].value],
            storeType: [this.storeTypes[4].value],
            scoType: [this.scoTypes[6].value],
            audience: [this.audiences[2].value],
            sopType: [this.sopTypes[2].value],
        }
    }
    filesToUpload: Array<File>;
    constructor(private _videoService: videoService) {
        this.filesToUpload = [];
    }
    submitted = false;
    public filechosen = true;
    public validfile = false;
    public videoError = true;
    public postVideo = true; 
    public postJsonVideo = true; 
    public jsonVideoResults: String; 
    // this method is triggered from my html when there is a valid video file to upload
    upLoad() {
        let strVideoName: String = this.filesToUpload[0].name;
        let Country: String[] = [];
        let storeType: String[] = [];
        let scoType: String[] = [];
        let audience: String[] = [];
        let sopType: String[] = [];

        if (this.countrys[4].isChecked != true) {
            for (var i of this.countrys) {
                switch (i.isChecked) {
                    case true:
                        Country.push(i.value);
                    case false:
                        continue;
                }
            }
        }
        else {
            for (var i of this.countrys) {
                Country.push(i.value);
                delete Country[4];
            }
        }
        if (this.storeTypes[4].isChecked != true) {
            for (var i of this.storeTypes) {
                switch (i.isChecked) {
                    case true:
                        storeType.push(i.value);
                    case false:
                        continue;
                }
            }
        }
        else {
            for (var i of this.storeTypes) {
                storeType.push(i.value);
                delete storeType[4];
            }
        }

        if (this.scoTypes[6].isChecked != true) {
            for (var i of this.scoTypes) {
                switch (i.isChecked) {
                    case true:
                        scoType.push(i.value);
                    case false:
                        continue;
                }
            }
        }
        else {
            for (var i of this.scoTypes) {
                scoType.push(i.value);
                delete scoType[6];
            }
        }

        if (this.audiences[2].isChecked != true) {
            for (var i of this.audiences) {
                switch (i.isChecked) {
                    case true:
                        audience.push(i.value);
                    case false:
                        continue;
                }
            }
        }
        else {
            this.audiences.forEach((i) => {
                audience.push(i.value);
                delete audience[2];
            });
        }
        if (this.sopTypes[2].isChecked != true) {
            for (var i of this.sopTypes) {
                switch (i.isChecked) {
                    case true:
                        sopType.push(i.value);
                    case false:
                        continue;
                }
            }
        }
        else {
            this.sopTypes.forEach((i) => {
                sopType.push(i.value);
                delete sopType[2];
            });
        }

        var jVidDescription = { "Descrption": this.sop.description }
        var jVidName = { "Name": strVideoName };
        var jCountry = { "Country": Country };
        var jStoreType = { "Store Type": storeType };
        var jScoType = { "Sco Type": scoType };
        var jAudience = { "Audience": audience };
        var jSopType = { "SOP Type": sopType };
        var jDateAvaliable = { "Date Avaliable": this.dateAvaliable.formatted };
        var jDateExpires = { 'Date Expires': this.dateExpires.formatted };

        var SOP = [
            jVidName, jVidDescription, jCountry, jStoreType, jScoType, jAudience, jSopType, jDateAvaliable, jDateExpires
        ];

        this.loading = true; 



        this._videoService.makeJsonFile(SOP).subscribe(res => {
            if(res.SopVideo == "recieved"){
               this.postJsonVideo = false; 
               this.validfile = false; 
               this.filechosen = true; 
               this.loading = false; 
            }
        }); 




        this._videoService.makeFileRequest("http://localhost:8080/upload", [], this.filesToUpload).then((result) => {
           if(result[0] == "recieved"){
               this.postVideo = false; 
               this.validfile = false;
               this.filechosen = true 
           }
        }, (error) => {
            console.log(error);
        });

    }


    // this method is fired everytime they change the file to make sure its a valid video format among other things.
    fileChangeEvent(fileInput: any) {
        //this.filechosen = false; 
        this.postJsonVideo = true; 
        this.postVideo = true; 
        let validFormt: boolean = false;
        this.filesToUpload = <Array<File>>fileInput.target.files;
        var file = this.filesToUpload[0];
        var videoNode = document.querySelector('video')
        if (file) {
            var URL = window.URL;
            var fileUrl = URL.createObjectURL(file);
            let ext: String = this.getExtension(file.name);

            switch (ext) {
                case 'm4v':
                case 'avi':
                case 'mpg':
                case 'mp4':
                    validFormt = true;
            }
        }

        if (file && validFormt) {
            this.filechosen = false;
            this.validfile = true;
            this.videoError = true;
            videoNode.src = fileUrl;
        }
        else {
            this.filechosen = true;
            this.validfile = false;
            this.videoError = false;
            var videodiv = document.getElementById('myVideoError');

            videodiv.innerHTML = '<p style="color: red;">Please select a valid video format or convert your video into a valid format such as mp4</p>'

        }

    }

    getExtension(filename: String) {
        var parts = filename.split('.');
        return parts[parts.length - 1];

    }





}