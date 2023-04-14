import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Report } from 'src/app/models/report.model';
import { UserResults } from 'src/app/models/user.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent implements OnInit {

  users: UserResults[] = []
  report: Report[] = []

  constructor(private db: DbService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Report - Swiggy')
    this.getUsers()
    this.getReport();
  }

  getUsers() {
    this.db.get('users/users').subscribe((data: UserResults[]) => {
      this.users = data
    })
  }

  getReport() {
    this.db.get('restaurants/userSpendings').subscribe((data: Report[]) => {
      this.report = data
    })
  }

}
