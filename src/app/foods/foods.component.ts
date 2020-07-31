import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilService } from '../services/util.service';
declare var require: any
@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {
  loading = true;
  isCopy = false;
  rest_r: any[] = [];
  dummyRest_r: any[] = [];
  dummy_r = Array(10);
  restaurants: any[] = [];
  rest: any[] = [];
  dummyRest: any[] = [];
  dummy = Array(10);
  selectedRestaurant: number = 0;
  copyFoods: any[] = [];
  uuid = "";
  downloadJsonHref;
  categories: any[] = [];
  categoryName = "";
  constructor(
    private api: ApisService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private util: UtilService,
    private cdr: ChangeDetectorRef
  ) {

    

    if(this.uuid.length>0){
      this.getRest();
    } else {
      this.getRestaurants();
    }


  }

  ngOnInit() { 

  }

  exportFoods(){
    var CircularJSON = require('circular-json');
    var theJSON = CircularJSON.stringify(this.rest);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }

  createCopyFoodsList(){

  
    this.categories.forEach(c => {
      let ids = this.util.makeid(15);
      let param = {
        uid: this.selectedRestaurant,
        name: c.name,
        id: ids
      };

      this.api.addVenueCategoies(ids, param).then((data) => {
      });
    });
    

    this.rest.forEach(e => {
      if(e.cid && e.cid.name){
        this.api.getsingleCategoryByName(this.selectedRestaurant,e.cid.name).then((data) => {
          let newFood = e;
          newFood.uid = this.selectedRestaurant;
          newFood.uuid = this.selectedRestaurant;
          newFood.cid = data[0].id;
          this.copyFoods.push(newFood);
        });
      }
    });
    return this.copyFoods;
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

  copyMenuToRestaurant(){
    this.spinner.show();
    this.createCopyFoodsList();
    this.delay(2000).then(any => { 
      this.copyFoods.forEach(food => {
        this.createFood(food);
        this.spinner.hide();
      });   
    });   
  } 

  createFood(param){
    this.api.createFood(param).then((data) => {
      this.spinner.hide();
      this.api.alerts('Success', 'Food added successfully', 'success'); 
      this.api.sendNotification('Checkout New Food ' + param.name, 'New Food Added').subscribe((data) => {
        console.log("success");
      }, error => {
        console.log(error);
      });
    });
  }

  copy(){
    this.api.getVenues().then((data) => {
      console.log('restaurants data', data);
      this.restaurants = data;
    }, error => {
      console.log(error);
      this.restaurants = [];
    }).catch(error => {
      console.log(error);
      this.restaurants = [];
    });
    this.isCopy = true;
  }

  

  edit(item,uuid){
    const navData: NavigationExtras = {
      queryParams: {
        id: item.id,
        uuid: uuid,
        register: false
      }
    };
    this.router.navigate(['fooddetails'], navData);
  }

  delete(item){
    Swal.fire({
      title: 'Are you sure?',
      text: 'To delete this food!',
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
        this.api.deleteFood(item).then((data) => {
          this.spinner.hide();
          this.getRest();
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

  getRestaurants() {
    this.api.getVenues().then((data) => {
      //console.log('rest data', data);
      this.rest = data;
      this.dummyRest = data;
      this.dummy = [];
      this.exportFoods();
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

  getRest() {
    this.api.getFoods(this.uuid).then((data) => {
      
      console.log(data);
      this.rest = data;
      this.dummyRest = data;
      this.dummy = [];

      console.log(this.uuid);
      this.api.getVenueCategories(this.uuid).then(data => {
        this.categories = data;
      }).catch(error => {
        console.log(error);
      });

      this.exportFoods();
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
    this.rest = this.filterItems(string);
  }


  protected resetChanges = () => {
    this.rest = this.dummyRest;
  }

  setFilteredItems() {
    console.log('clear');
    this.rest = [];
    this.rest = this.dummyRest;
  }

  filterItems(searchTerm) {
    return this.rest.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  
  getClass(item) {
    if (item === 'created' || item === 'accepted' || item === 'picked') {
      return 'btn btn-primary btn-round';
    } else if (item === 'delivered') {
      return 'btn btn-success btn-round';
    } else if (item === 'rejected' || item === 'cancel') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-warning btn-round';
  }

  openRest(item) {
    const navData: NavigationExtras = {
      queryParams: {
        id: item.id,
        register: false
      }
    };
    this.router.navigate(['restdetails'], navData);
  }

  choose(item) {
    console.log(item.uid);
    this.uuid = item.uid;
    this.getRest();
  }

  changeStatus(item) {
    console.log(item);
    const text = item.status === 'open' ? 'close' : 'open';
    Swal.fire({
      title: 'Are you sure?',
      text: `You can change it later`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ' + text + ' it!'
    }).then((result) => {
      if (result.value) {
        const param = {
          uid: item.uid,
          isClose: true,
          status: text,
        };
        this.spinner.show();
        this.api.updateVenue(param).then((data) => {
          this.spinner.hide();
          this.getRest();
          Swal.fire(
            'Updated!',
            'Restaurants updated',
            'success'
          );
        }).catch(error => {
          console.log(error);
          this.spinner.hide();
        });
        const userStatus = text === 'open' ? 'active' : 'deactive';
        const statusChange = {
          status: userStatus
        };
        this.api.updateProfile(item.uid, statusChange).then(data => {
          console.log(data);
        }).catch(error => {
          console.log(error);
        });
      }
    });
  }

  createNew() {
    const navData: NavigationExtras = {
      queryParams: {
        register: true,
        uuid:this.uuid
      }
    };
    this.router.navigate(['fooddetails'], navData);
  }

  getCurrency() {
    return this.api.getCurrecySymbol();
  }
}

export class Category {
  id:string;
  name:string;
  uid:string;
}
