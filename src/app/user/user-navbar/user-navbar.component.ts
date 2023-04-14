import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Navbar } from 'src/app/models/navbar.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  public menu: Navbar[] = [
    { name: 'Restaurants', link: 'restaurants', active: false },
    { name: 'Orders', link: 'orders', active: false }
  ]


  constructor(private router: Router, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.reviewService.saveOrder(null, [])
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
