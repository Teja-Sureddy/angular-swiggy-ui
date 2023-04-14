import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Navbar } from 'src/app/models/navbar.model';

@Component({
  selector: 'app-manager-navbar',
  templateUrl: './manager-navbar.component.html',
  styleUrls: ['./manager-navbar.component.css']
})
export class ManagerNavbarComponent implements OnInit {

  public menu: Navbar[] = [
    { name: 'Restaurant', link: 'restaurant', active: false },
    { name: 'Orders', link: 'orders', active: false }
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

    this.menu.forEach(obj => {
      if (obj.link === url) obj.active = true
      else obj.active = false
    });
  }
}