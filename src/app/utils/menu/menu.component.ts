import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from 'src/app/models/navbar.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isNavbarOpen = true;
  @ViewChild('navbarSupportedContent', { read: ElementRef, static: false }) navbarSupportedContent: ElementRef;

  constructor(
    private router: Router,
    private authenticationService: AuthService) { }

  @Input() menu: Navbar

  ngOnInit(): void {
  }

  hide() {
    this.navbarSupportedContent.nativeElement.classList.remove('show');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}