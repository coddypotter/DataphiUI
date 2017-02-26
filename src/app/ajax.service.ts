import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
// import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class AjaxService {
  API_URL: string = "https://frozen-hamlet-26781.herokuapp.com/patient/";
  headers: Headers = new Headers();
  constructor(private http: Http) {
    
  }
  getMethod(path: string) {
    this.headers = new Headers();
    return this.http.get(this.API_URL + path, { headers: this.headers }).map(
      (res) => res.json()
    );
  }

  postMethod(path: string, data: any) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    return this.http.post(this.API_URL + path, data, { headers: this.headers }).map(
      (res) => res.json()
    );
  }

  deleteMethod(path: string) {
    this.headers = new Headers();
    return this.http.delete(this.API_URL + path, { headers: this.headers}).map(
      (res) => res.json()
    );
  }

}
