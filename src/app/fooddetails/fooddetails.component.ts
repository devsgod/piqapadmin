import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from '../services/apis.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import * as firebase from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { UtilService } from '../services/util.service';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

declare var google: any;
@Component({
  selector: 'app-fooddetails',
  templateUrl: './fooddetails.component.html',
  styleUrls: ['./fooddetails.component.scss']
})
export class FooddetailsComponent implements OnInit {
  @ViewChild('placesRef', { static: false }) placesRef: GooglePlaceDirective;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  banner_to_upload: any = '';
  id: any;
  uuid: any;
  new: boolean;
  price: any = '';
  coverImage: any;
  name: any = '';
  category: any;
  haveData: boolean = false;
  secilenFood: any;
  categories: any[] = [];

  form: FormGroup;

  sizename: any[] = [];
  sizePrice: any[] = [];

  desc: any;
  ratting: any;
  veg: boolean = true;
  status: boolean = true;
  variations: any[] = [];
  size: boolean = false;
  
  sizes = [];
  addons = [];
  ext = [];

  

  addSize() {
    this.sizes.push({title:'',price:''});
  }
  addAddon(){
    this.addons.push({title:'',type:''});
  }
  add(i){
    this.ext.push({addon_index:i,title:'',price:''});
  }
  removeSize(i){
    this.sizes.splice(i, 1);
  }
  removeAddon(i){
    this.addons.splice(i, 1);
  }
  removeExt(i){
    this.ext.splice(i, 1);
  }

  constructor(
    private route: ActivatedRoute,
    private api: ApisService,
    private toastyService: ToastyService,
    private spinner: NgxSpinnerService,
    private navCtrl: Location,
    private chMod: ChangeDetectorRef,
    private util: UtilService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {

    this.form = this.fb.group({
      credentials: this.fb.array([]),
    });
    
      
    
  }

  getCategory(id) {  
    
    console.log(id); 
    this.api.getVenueCategories(id).then(data => {

      this.categories = data;
      this.cdr.detectChanges();
    }).catch(error => {
      console.log(error);
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    console.log("nice here");
    this.route.queryParams.subscribe(data => {
      
      this.uuid = data.uuid;

      this.getCategory(data.uuid);

      this.new = data.register === 'true' ? true : false;
      
      if (data.hasOwnProperty('id')) {
        this.id = data.id;
        
        this.getFood();
      } else {
        this.selectedItems = [
        ];
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'item_id',
          textField: 'item_text',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          allowSearchFilter: true
        };
      }
      this.cdr.detectChanges();
    });
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  getFood() {
    this.api.getFoods(this.uuid).then((data) => { 
      if (data) {
        data.forEach(e => {
          if(e.id == this.id){
            this.secilenFood = e;
          }
        });
        this.haveData = true;

        this.name = this.secilenFood.name;
        this.price = this.secilenFood.price;
        this.coverImage = this.secilenFood.cover;
        this.category = this.secilenFood.cid.id;
        this.desc = this.secilenFood.desc;
        this.veg = this.secilenFood.veg; 
        
        let gelenAddon = [];
        let gelenSizes = [];
        let gelenExt = []; 

        this.secilenFood.variations.forEach(e => {
          if(e.title == "size"){
            gelenSizes.push(e.items);
          } else {
            gelenAddon.push(e);
          }
        });
        gelenSizes[0].forEach(e => {
          this.sizes.push({title:e.title,price:e.price});
        });        
        gelenAddon.forEach(e => {
          this.addons.push({title:e.title,type:e.type});
          gelenExt.push(e.items);
        });
        let i = 0;
        gelenExt.forEach(e => {
          e.forEach(element => {
            this.ext.push({title:element.title,price:element.price,addon_index:i});
          });
          i++;
        });
        this.chMod.detectChanges();
      }
    }).catch(error => {
      console.log(error);
    });
   
  }

  getImage(cover) {
    return cover ? cover : 'assets/icon.png';
  }
  getDate(date) {
    return moment(date).format('llll');
  }
 

  updateFood() {
    let size_bool = false;
    if(this.sizes.length>0){
      size_bool = true;
    }
    this.variations.push({items:this.sizes,title:"size",type:"radio"});

    let i = 0;
    this.addons.forEach(a => {
      let a_items = [];
      this.ext.forEach(e => {
        if(e.addon_index == i){
          a_items.push({title:e.title,price:e.price});
        }
      });
      this.variations.push({
        items:a_items,
        title:a.title,
        type:a.type
      });
      i++;
    });

    const param = {
      cid: this.category,
      cover: this.coverImage,
      desc: this.desc,
      name: this.name,
      price : this.price,
      ratting: 0,
      size: size_bool,
      status: this.status,
      uuid: this.uuid,
      variations:this.variations,
      veg:this.veg,
      uid: this.id
    };

    
    
    this.spinner.show();
    this.api.updateFood(param).then((data) => {
      this.spinner.hide();
      
     
      this.navCtrl.back(); 
    }, error => {
      this.spinner.hide();
      
      this.navCtrl.back(); 
    }).catch(error => {
      this.spinner.hide();
      
      this.navCtrl.back();
    });
  }

  create() {

    
    this.variations.push({items:this.sizes,title:"size",type:"radio"});

    let i = 0;
    this.addons.forEach(a => {
      let a_items = [];
      this.ext.forEach(e => {
        if(e.addon_index == i){
          a_items.push({title:e.title,price:e.price});
        }
      });
      this.variations.push({
        items:a_items,
        title:a.title,
        type:a.type
      });
      i++;
    });
    
    let size_bool = false;
    if(this.sizes.length>0){
      size_bool = true;
    }
            const param = {
              cid: this.category,
              cover: this.coverImage,
              desc: this.desc,
              name: this.name,
              price : this.price,
              ratting: 0,
              size: size_bool,
              status: this.status,
              uid: this.uuid,
              uuid: this.uuid,
              variations:this.variations,
              veg:this.veg
            };

            this.api.createFood(param).then((data) => {
              this.spinner.hide();
              
              this.api.alerts('Success', 'Food added successfully', 'success'); 
              this.api.sendNotification('Checkout New Food ' + this.name, 'New Food Added').subscribe((data) => {
                
                this.success('Notications sent');
              }, error => {
                console.log(error);
                this.error('Something went wrong');
              });
              this.navCtrl.back();
            });
  }

  error(message) {
    const toastOptions: ToastOptions = {
      title: 'Error',
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    this.toastyService.error(toastOptions);
  }
  success(message) {
    const toastOptions: ToastOptions = {
      title: 'Success',
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    this.toastyService.success(toastOptions);
  }

  preview_banner(files) {

    console.log('fle', files);
    this.banner_to_upload = [];
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    this.banner_to_upload = files;
    if (this.banner_to_upload) {
      this.spinner.show();
      
      const file1 = files[0];
      const storageRef = firebase.storage().ref('drivers' + '/' + file1.name);
      const task = storageRef.put(file1);
      task.on('state_changed',
        (snapshot: any) => {
        },
        (error) => {
          this.spinner.hide();
          this.error('Something went wrong');
          // this.api.alerts('Error', 'Something went wrong', 'error');
          console.error(error);
        },
        () => {
          storageRef.getDownloadURL().then((downloadURL) => {
            console.log('download ur', downloadURL);
            this.coverImage = downloadURL;
            this.spinner.hide();
          },
            (error) => {
              this.spinner.hide();
              this.error('Something went wrong');
              console.error('upload rejected', error);
            });
        }
      );

    } else {
      console.log('no');
    }
  }

  getCurrency() {
    return this.api.getCurrecySymbol();
  }

}
