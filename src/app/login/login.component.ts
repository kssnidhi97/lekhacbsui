import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: ToastrService, private router: Router) { }

  loginCredentials = { username: '', password: '' };
  loginCredentials1 = { username: 'ceo', password: 'ceo' };
  loginCredentials2 = { username: 'user', password: 'user' };


  ngOnInit(): void {
  }

  login() {
    if (JSON.stringify(this.loginCredentials) === JSON.stringify(this.loginCredentials1)) {
      this.set(this.loginCredentials.username);
      this.toastr.success("Logged in", "Successfully");
      this.router.navigate(["cbs/dashboard/dashboard"]);
    } else if (JSON.stringify(this.loginCredentials) === JSON.stringify(this.loginCredentials2)) {
      this.set(this.loginCredentials.username);
      this.toastr.success("Logged in", "Successfully");
      this.router.navigate(["cbs/dashboard/dashboard"]);
    }
    else {
      this.toastr.error("Username & Password mismatch");
    }
  }

  set(value: string) {
    localStorage.setItem('userName', value);
  }

}
