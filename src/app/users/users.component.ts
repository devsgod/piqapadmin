import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApisService } from '../services/apis.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  dummy = Array(10);
  dummyUsers: any[] = [];
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.getUsers();
  }

  ngOnInit() {
  }
  getUsers() {
    this.users = [];
    this.dummyUsers = [];
    this.api.getUsers().then((data) => {
      this.dummy = [];
      console.log('users data', data);
      data.forEach(element => {
        if (element.type === 'user') {
          this.users.push(element);
          this.dummyUsers.push(element);
        }
      });
      console.log(this.users);
      this.cdr.detectChanges();
    }, error => {
      console.log(error);
      this.dummy = [];
      this.cdr.detectChanges();
    }).catch(error => {
      console.log(error);
      this.dummy = [];
      this.cdr.detectChanges();
    });
  }
  search(string) {
    this.resetChanges();
    console.log('string', string);
    this.users = this.filterItems(string);
  }


  protected resetChanges = () => {
    this.users = this.dummyUsers;
  }

  setFilteredItems() {
    console.log('clear');
    this.users = [];
    this.users = this.dummyUsers;
  }

  getClass(item) {
    if (item === 'active') {
      return 'btn btn-primary btn-round item-status';
    } else if (item === 'deactive') {
      return 'btn btn-danger btn-round item-status';
    }
    return 'btn btn-warning btn-round item-status';
  }
  changeStatus(item) {
    const text = item.status === 'active' ? 'deactive' : 'active';
    console.log(text);
    Swal.fire({
      title: 'Are you sure?',
      text: 'To ' + text + ' this user!',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText:'Yes',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      backdrop: false,
      background: 'white'
    }).then((data) => {
      if (data && data.value) {
        console.log('update it');
        item.status = text;
        console.log(item);
        this.spinner.show();
        this.api.updateProfile(item.uid, item).then((data) => {
          this.spinner.hide();
          this.getUsers();
        }, error => {
          console.log(error);
          this.spinner.hide();
        }).catch(error => {
          this.spinner.hide();
          console.log(error);
        });
      }
    });
  }
  filterItems(searchTerm) {
    return this.users.filter((item) => {
      return item.fullname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  openUser(item) {
    const navData: NavigationExtras = {
      queryParams: {
        id: item.uid
      }
    };
    this.router.navigate(['userdetails'], navData);
  }
}
