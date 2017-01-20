import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class videoService {
    private headers = new Headers({ 'content-type': 'application/json' });
    private videourl = 'http://localhost:8080/json';
    private getVideoJsonUrl = 'http://localhost:8080/getJsonData'; 
    private options = new RequestOptions({headers: this.headers})


    constructor(private http: Http) { }


    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for (var file in files) {
                formData.append("uploads", files[file], files[file].name)
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        })
    }

    makeJsonFile(SOP: Object) {
        return this.http.post(this.videourl, JSON.stringify(SOP), this.options)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));




    }

    getJsonData(){
        return this.http.get(this.getVideoJsonUrl, this.options)
        .map((res: any) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }


}