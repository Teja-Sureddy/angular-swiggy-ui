import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Navbar } from 'src/app/models/navbar.model';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  public menu: Navbar[] = [
    { name: 'Users', link: 'users', active: false },
    { name: 'Restaurants', link: 'restaurants', active: false },
    { name: 'Orders', link: 'orders', active: false },
    { name: 'Report', link: 'report', active: false }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.activateMenu(this.router.url);
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.activateMenu(val.url);
      }
    });
  }

  activateMenu(url: string) {
    url = url.split("/").pop()!;

    this.menu.forEach((obj: Navbar) => {
      if (obj.link === url) obj.active = true
      else obj.active = false
    });
  }

}
