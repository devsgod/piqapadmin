import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  dummy = Array(10);
  banners: any[] = [];
  constructor(
    private router: Router,
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {
    this.getBanners();
  }

  getBanners() {
    this.api.getBanners().then(data => {
      console.log(data);
      this.dummy = [];
      this.banners = data;
      this.cdr.detectChanges();
      
    }).catch(error => {
      this.dummy = [];
      console.log(error);
      this.cdr.detectChanges();
    });
  }
  ngOnInit() {
  }
  createNew() {
    this.router.navigate(['/add-banner']);
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
    Swal.fire({
      title: 'Are you sure?',
      text: ' this banner!',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'CanceL',
      backdrop: false,
      background: 'white'
    }).then((data) => {
      if (data && data.value) {
        console.log('update it');
        item.status = text;
        console.log(item);
        this.spinner.show();
        this.api.updateBanner(item).then((data) => {
          this.spinner.hide();
          this.getBanners();
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
  delete(item) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'To delete this banner!',
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      backdrop: false,
      background: 'white'
    }).then((data) => {
      if (data && data.value) {
        console.log('update it');
        this.spinner.show();
        this.api.deleteBanner(item).then((data) => {
          this.spinner.hide();
          this.getBanners();
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
}
