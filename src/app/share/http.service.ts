import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  getHttpClientOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  get(url: string, callback: (arg0: Object) => void) {
    this.http.get(url, this.getHttpClientOptions())
      .subscribe((response) => {
        callback(this.extractData(response));
      },
        (error: HttpErrorResponse) => {
          callback(this.extractData(error))
        });
  }

  post(url: string, data: any, callback: (arg0: Object) => void) {
    this.http.post(url, data, this.getHttpClientOptions())
      .subscribe((response) => {
        callback(this.extractData(response));
      },
        (error: HttpErrorResponse) => {
          callback(this.extractData(error));
        });
  }

  delete(url: string, callback: (arg0: Object) => void) {
    this.http.delete(url, this.getHttpClientOptions())
      .subscribe((response) => {
        callback(this.extractData(response));
      },
        (error: HttpErrorResponse) => {
          callback(this.extractData(error))
        });
  }

  put(url: string, data: any, callback: (arg0: Object) => void) {
    this.http.put(url, data, this.getHttpClientOptions())
      .subscribe((response) => {
        callback(this.extractData(response));
      },
        (error: HttpErrorResponse) => {
          callback(this.extractData(error));
        });
  }

  private extractData(response: Object) {
    return response;
  }

}