import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer-application',
  templateUrl: './customer-application.component.html',
  styleUrls: ['./customer-application.component.css']
})
export class CustomerApplicationComponent implements OnInit {

  customerFormDiv: boolean = false;
  customerDetailDiv: boolean = false;
  customerTableDiv: boolean = true;

  customerForm: any;

  date = new Date();
  bdate = new Date();

  age: number | undefined;

  photoUrl: any;
  signatureUrl: any;
  kycDocumentUrl: any;

  customerDataSource!: MatTableDataSource<Element>;

  customers: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatPaginator)
  set initDataSource(paginator: MatPaginator) {
    this.paginator = paginator;
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = ['name', 'action'];

  customer: any;
  fileName: null;
  documents: any;

  title = [
    { value: 'Mr', viewValue: 'Mr.' },
    { value: 'Mrs ', viewValue: 'Mrs.' },
    { value: 'Kum ', viewValue: 'Kum.' },
  ];

  gender = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'other', viewValue: 'Other' }
  ];

  constructor(public fb: FormBuilder, private toastr: ToastrService, private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  applyFilterOnCustomer(event: any) {
    let filterValue= event.target.value;
    this.customerDataSource.filter = filterValue.trim().toLowerCase();
  }

  getCustomers() {
    this.customerService.getCustomer((response: any) => {
      if (!response.error) {
        this.customers = response;
        this.customerDataSource = new MatTableDataSource(this.customers);
        this.customerDataSource.paginator = this.paginator;
      } else {
        this.toastr.warning("No customers found");
      }
    })
  }

  detailCustomer(id: string) {
    this.customerDetailDiv = true;
    this.customerTableDiv = true;
    this.customerFormDiv = false;
    this.fileName = null;

    this.customerService.getCustomerById(id, (response: any) => {
      if (!response.error) {
        this.customer = response;
        this.documents = this.customer.documents;
        this.documents.forEach((document: { documentCategory: { name: string; }; fileName: null; }) => {
          if (document.documentCategory.name === 'Photo') {
            this.fileName = document.fileName;

          }
        })
      } else {
        this.toastr.warning("No customer found");
      }
    })
  }

  createCustomer() {
    this.initForm();
    this.customerFormDiv = true;
    this.customerTableDiv = true;
    this.customerDetailDiv = false;
  }

  closeCustomerForm() {
    this.customerFormDiv = false;
  }

  initForm() {
    this.customerForm = this.fb.group({
      applicationDate: new FormControl(this.date),
      dateOfBirth: new FormControl(),
      title: new FormControl(),
      name: new FormControl(),
      gender: new FormControl(),
      age: new FormControl(),

      customerPersonalDetails: new FormGroup({
        residentialAddress: new FormControl(),
        village: new FormControl(),
        taluka: new FormControl(),
        district: new FormControl(),
        phoneNumber: new FormControl(''),
        pinCode: new FormControl(''),
        religion: new FormControl(''),
        subCaste: new FormControl(''),
        nationality: new FormControl(''),
        dependents: new FormControl(),
        emailId: new FormControl(''),
        rationCardNumber: new FormControl(''),
        voterIdNumber: new FormControl(''),
        panNumber: new FormControl(''),
        aadharCardNumber: new FormControl(''),
        annualIncome: new FormControl(),
      }),

      familyMemberDetails: this.fb.array([this.initFamilyMemberDetails()]),
      nomineeDatails: this.fb.array([this.initNomineeDetails()]),

    })
  }

  initFamilyMemberDetails() {
    return this.fb.group({
      title: [],
      name: [],
      occupationCode: [],
      age: [],
      relation: []
    });
  }

  addFamilyMemberDetails() {
    const control = <FormArray>this.customerForm.controls['familyMemberDetails'];
    control.push(this.initFamilyMemberDetails());
  }

  deleteFamilyMembeDetails(index: number) {
    const control = <FormArray>this.customerForm.controls['familyMemberDetails'];
    control.removeAt(index);
  }

  public calculateAge(date: any): void {
    var diff = Math.abs(this.date.getTime() - date.value.getTime());
    this.age = Math.floor((diff / (1000 * 3600 * 24)) / 365);
    this.customerForm.controls["age"].setValue(this.age);
  }

  initNomineeDetails() {
    return this.fb.group({
      relationWithCustomer: [],
      residentiaAddress: [],
      name: [],
      village: [],
      taluka: [],
      district: [],
      phoneNumber: [],
      age: [],
      pinCode: []
    });
  }

  /* Photo & Signature tab start */

  readPhotoUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.photoUrl = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.uploadPhoto(event);
    }
  }

  uploadPhoto(event: { target: { files: (string | Blob)[]; }; }) {
    this.customerService.uploadPhoto(event.target.files[0]).subscribe(event => {
      if (event instanceof HttpResponse) {
        if (event != null && event['body'] != "") {
          this.toastr.info("Image uploaded successfully");
        }
      }
    })
  }

  readSignatureUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.signatureUrl = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.uploadSignature(event);
    }
  }

  uploadSignature(event: { target: { files: (string | Blob)[]; }; }) {
    this.customerService.uploadSigniture(event.target.files[0]).subscribe(event => {
      if (event instanceof HttpResponse) {
        if (event != null && event['body'] != "") {
          this.toastr.info("Signature uploaded successfully")
        }
      }
    })
  }

  /* Photo & Signature tab end */

  /* Upload KYC tab start */

  readDocumentUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.kycDocumentUrl = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.uploadDocument(event);
    }
  }

  uploadDocument(event: { target: { files: (string | Blob)[]; }; }) {
    this.customerService.uploadDocument(event.target.files[0]).subscribe(event => {
      if (event instanceof HttpResponse) {
        if (event != null && event['body'] != "") {
          this.toastr.info("Document uploaded successfully");
        }
      }
    })
  }

  /* Upload KYC end */

  saveCustomer(data: any) {
    console.log(data);
    this.customerService.saveCustomer(data, (response: any) => {
      if (response.error) {
        this.toastr.error("Customer application not submitted");
      } else {
        this.toastr.success("Customer application submitted successfully");
        this.customerForm.reset();
        this.customerFormDiv = false;
      }
    })
  }

  deleteCustomer(id: string) {
    this.customerService.deleteCustomerById(id, () => {
      this.toastr.success("Customer deleted successfully");
      this.getCustomers();
    })
  }
}
