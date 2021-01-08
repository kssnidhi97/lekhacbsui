import { Injectable } from '@angular/core';
import { HttpService } from '../share/http.service';
import { Configuration } from '../share/constants';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable()
export class CustomerService {
  constructor(private httpService: HttpService, private httpClient: HttpClient) { }

  public getCustomer(callback: (arg0: Object) => void) {
    const url = Configuration.apiPath + "/customer";
    this.httpService.get(url, callback);
  }

  public saveCustomer(data: any, callback: (arg0: Object) => void) {
    const url = Configuration.apiPath + "/customer";
    this.httpService.post(url, data, callback);
  }

  public getCustomerById(id: string, callback: (arg0: Object) => void) {
    const url = Configuration.apiPath + "/customer/" + id;
    this.httpService.get(url, callback);
  }

  public deleteCustomerById(id: string, callback: (arg0: Object) => void) {
    const url = Configuration.apiPath + "/customer/" + id;
    this.httpService.delete(url, callback);
  }

  public uploadPhoto(file: string | Blob) {
    const endpoint = Configuration.apiPath + "/document-upload/1";
    const formdata: FormData = new FormData();
    formdata.append('file', file);

    const req = new HttpRequest('POST', endpoint, formdata);
    return this.httpClient.request(req);
  }

  public uploadSigniture(file: string | Blob) {
    const endpoint = Configuration.apiPath + "/document-upload/2";
    const formdata: FormData = new FormData();
    formdata.append('file', file);

    const req = new HttpRequest('POST', endpoint, formdata);
    return this.httpClient.request(req);
  }

  public uploadDocument(file: string | Blob) {
    const endpoint = Configuration.apiPath + "/document-upload/3";
    const formdata: FormData = new FormData();
    formdata.append('file', file);

    const req = new HttpRequest('POST', endpoint, formdata);
    return this.httpClient.request(req);
  }

  public uploadDocumentUpdate(file: string | Blob, id: string) {
    const endpoint = Configuration.apiPath + "/customer/update-profile-pic/" + id + "/1";
    const formdata: FormData = new FormData();
    formdata.append('file', file);

    const req = new HttpRequest('POST', endpoint, formdata);
    return this.httpClient.request(req);
  }

}