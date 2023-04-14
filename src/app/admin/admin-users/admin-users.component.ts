import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FilterMatchMode } from 'primeng/api';
import { Delete } from 'src/app/models/delete.model';
import { EventFilter } from 'src/app/models/filters/eventFilters.models';
import { Params } from 'src/app/models/params.model';
import { User, UserResults } from 'src/app/models/user.model';
import { DbService } from 'src/app/services/db.service';
import { FilteringService } from 'src/app/services/filtering.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  public users: UserResults[] = [];
  totalRecords: number = 0;
  deleteUserData: Delete = { title: '', id: -1 }
  public matchModeOptions = [
    { label: "Starts with", value: FilterMatchMode.STARTS_WITH },
    { label: "Contains", value: FilterMatchMode.CONTAINS }
  ];

  constructor(private filterService: FilteringService, private db: DbService, private toast: ToastService, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Users - Swiggy')
  }

  deleteUser() {
    this.db.delete('users', this.deleteUserData.id)
      .subscribe((data) => {
        this.toast.alert('success', 'User Removed.')
        let index = this.users.findIndex((user) => user.id === this.deleteUserData.id)
        if (index > -1) {
          this.users.splice(index, 1)
          this.totalRecords--
        }
        this.deleteUserData = { title: '', id: -1 }
      });
  }

  loadUsers(event: EventFilter) {
    let params: Params[] = this.filterService.filterLazyLoadEvent(event)
    this.getUsers(params)
  }

  getUsers(params: Params[]) {    
    this.db.get('users', params).subscribe((data: User) => {
      this.totalRecords = data.count
      this.users = data.results;
    })
  }

}
