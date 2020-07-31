import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ApisService } from '../../services/apis.service';
import * as moment from 'moment';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: [
    './dashboard1.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class Dashboard1Component implements OnInit {
  rest: any[] = [];
  users: any[] = [];
  drivers: any[] = [];
  orders: any[] = [];
  displayOrders: any[] = [];
  dummy = Array(10);
  constructor(
    private api: ApisService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // this.getUsers();
    this.getAllOrders();
  }

  ngOnInit() {
  }

  getRest() {
    this.api.getVenues().then((data) => {
      console.log('rest data', data);
      this.rest = data;
      this.getUsers();
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }

  getUsers() {
    this.users = [];
    this.drivers = [];
    this.api.getUsers().then((data) => {
      console.log('users data', data);
      data.forEach(element => {
        if (element.type === 'user') {
          this.users.push(element);
        } else if (element.type === 'delivery') {
          this.drivers.push(element);
        }
      });
      this.cdr.detectChanges();
    }, error => {
      console.log(error);
      this.cdr.detectChanges();
    }).catch(error => {
      console.log(error);
      this.cdr.detectChanges();
    });
  }

  getAllOrders() {
    this.api.getAllOrders().then((data) => {
      console.log('orders data', data);
      data.forEach(element => {
        element.time = new Date(element.time);
      });
      data.sort((a, b) => b.time - a.time);
      this.orders = data;
      this.orders.forEach((element, i) => {
        if (i <= 9) {
          element.order = JSON.parse(element.order);
          this.displayOrders.push(element);
        }
      });
      this.dummy = [];
      this.getRest();
    }, error => {
      console.log(error);
      this.dummy = [];
    }).catch(error => {
      console.log(error);
      this.dummy = [];
    });
  }

  getDates(date) {
    return moment(date).format('llll');
  }

  getClass(item) {
    if (item === 'created' || item === 'accepted' || item === 'picked') {
      return 'btn btn-primary btn-round item-status';
    } else if (item === 'delivered') {
      return 'btn btn-success btn-round item-status';
    } else if (item === 'rejected' || item === 'cancel') {
      return 'btn btn-danger btn-round item-status';
    }
    return 'btn btn-warning btn-round item-status';
  }

  openOrder(item) {
    console.log(item);
    const navData: NavigationExtras = {
      queryParams: {
        id: item.id
      }
    };
    this.router.navigate(['orderdetails'], navData);
  }

  getCurreny() {
    return this.api.getCurrecySymbol();
  }

  onResized(event: any) {
    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 300);
  }

  fireRefreshEventOnWindow = function () {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("resize", true, false);
    window.dispatchEvent(evt);
  };
}
