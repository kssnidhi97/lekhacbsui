import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  loggedIn: string | null | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('userName');
  }

  logout(){
    localStorage.removeItem('userName');
    this.router.navigate(['']);
  }
}
