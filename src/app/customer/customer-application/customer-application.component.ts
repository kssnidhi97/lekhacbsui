import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-application',
  templateUrl: './customer-application.component.html',
  styleUrls: ['./customer-application.component.css']
})
export class CustomerApplicationComponent implements OnInit {

  customerTableDiv: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  createCustomer() {
    this.initForm();
    this.customerFormDiv = true;
    this.customerTableDiv = true;
    this.customerDetailDiv = false;
  }

}
