import { Component, OnInit } from '@angular/core';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import { ApisService } from '../services/apis.service';
import * as moment from 'moment';
import { VirtualTimeScheduler } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  rest: any[] = [];
  restId: any;
  from: any;
  to: any;
  allOrders: any[] = [];
  restOrder: any[] = [];
  totalAmount: any = 0;
  commisionAmount: any = 0;
  toPay: any = 0;

  deliveryCharge:any = 0;
  tipAmount:any = 0;
  total:any = 0;
  tax:any = "";
  taxAmount:any = 0;
  payable:any = 0;
  paid:any = 0;
  charges:any = 0;
  cardFee:any = 0;
  piqapNet:any = 0;
  payType:any = "";

  city:any;

  constructor(
    private api: ApisService,
    private toastyService: ToastyService,
    private spinner: NgxSpinnerService   
  ) {
    this.getRest();
    this.api.getAllOrders().then(data => {
      console.log(data);
      this.allOrders = data;
    });
  }

  ngOnInit() {
  }
  getRest() {
    this.api.getVenues().then((data) => {
      console.log('rest data', data);
      this.rest = data;
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }

  getStatsTotal(){
    this.totalAmount = parseFloat(this.totalAmount).toFixed(2);
    this.deliveryCharge = parseFloat(this.deliveryCharge).toFixed(2);
    this.tipAmount = parseFloat(this.tipAmount).toFixed(2);
    this.total = parseFloat(this.total).toFixed(2);
    this.taxAmount = parseFloat(this.taxAmount).toFixed(2);
    this.payable = parseFloat(this.payable).toFixed(2);
    this.charges = parseFloat(this.charges).toFixed(2);
    this.paid = parseFloat(this.paid).toFixed(2);
    this.cardFee = parseFloat(this.cardFee).toFixed(2);
    this.piqapNet = parseFloat(this.piqapNet).toFixed(2);
    this.commisionAmount = parseFloat(this.commisionAmount).toFixed(2);
    this.toPay = this.totalAmount - this.commisionAmount;
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

  getStats(){
    this.spinner.show();
    this.getStatsCal();
    this.delay(3000).then(any => { 
         this.getStatsTotal();
         this.spinner.hide();
    });  
  }

  getStatsCal() {
    console.log(this.from);
    console.log(this.to);
    if (!this.from || !this.to) {
      this.error('Please select valid date');
    }
    if (this.restId === '' || !this.restId) {
      this.error('Please select restaurants');
      return false;
    } else {
      this.getStatsCalByRestaurant();
    }
  }

  getStatsCalByRestaurant(){
    console.log(this.restId);
    const restOrders = this.allOrders.filter(x => x.restId === this.restId && x.status === 'delivered');
    //const restOrders = this.allOrders.filter(x => x.restId === this.restId);
    console.log(restOrders);
    this.totalAmount = 0;
    this.commisionAmount = 0;

    

    const from = new Date(this.from).getTime();
    const to = new Date(this.to).getTime();
    console.log('from =->thi', from);
    console.log('to=>', to);
    this.restOrder = [];



    restOrders.forEach(element => {
      let testDate = new Date(element.time).getTime();
      console.log('testdate', testDate);
      if (testDate >= from && testDate <= to) {
        this.restOrder.push(element);
      }
    });
    console.log('orders', this.restOrder);
    this.restOrder.forEach(element => {
      console.log('hope');

      let city_id = element.vid.city;
      this.api.getCity(city_id).then(data => {
        this.city = data[0];
        this.tax = data[0].tax;
        console.log(this.tax);
        this.totalAmount = this.totalAmount + parseFloat(element.total);
        let commision = (parseFloat(element.total) * 5) / 100;
        this.commisionAmount = this.commisionAmount + commision;
        this.payType = element.paid;    
        this.deliveryCharge = this.deliveryCharge + parseFloat(element.deliveryCharge);
        this.tipAmount = this.tipAmount + parseFloat(element.tipAmount);
        this.taxAmount = this.taxAmount + ((parseFloat(element.total)*parseFloat(this.tax))/100);
        this.payable = this.payable + ( ((parseFloat(element.total)+parseFloat(element.deliveryCharge)+parseFloat(element.tipAmount))+(((parseFloat(element.total)*parseFloat(this.tax))/100)) ));
        this.charges = this.charges + (((parseFloat(element.total)+parseFloat(element.deliveryCharge)+parseFloat(element.tipAmount))*14)/100);
        this.paid = this.paid + ((((parseFloat(element.total)+parseFloat(element.deliveryCharge)+parseFloat(element.tipAmount))*14)/100))+(( ((parseFloat(element.total)+parseFloat(element.deliveryCharge)+parseFloat(element.tipAmount))+(((parseFloat(element.total)*parseFloat(this.tax))/100)) )) );
        let cFee = 0;
        if(this.payType == "card"){
           cFee = ((((((parseFloat(element.total)+parseFloat(element.deliveryCharge)+parseFloat(element.tipAmount))*14)/100))+(( ((parseFloat(element.total)+parseFloat(element.deliveryCharge)+parseFloat(element.tipAmount))+(((parseFloat(element.total)*parseFloat(this.tax))/100)) )) ))*2.9)/100;
        }
        this.cardFee = this.cardFee + cFee;
        this.piqapNet = this.piqapNet + ( ((((parseFloat(element.total)+parseFloat(element.deliveryCharge)+parseFloat(element.tipAmount))*14)/100))-((cFee)+(((parseFloat(element.total)*parseFloat(this.tax))/100))) );
        
      }).catch(error => {
        console.log(error);
      }); 


      
    });
  }


  error(message) {
    const toastOptions: ToastOptions = {
      title:'Error',
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

  getCommisions(total) {
    return ((parseFloat(total) * 5) / 100).toFixed(2);
  }

  donwloadPDF() {

  }
  today() {
    return moment().format('ll');
  }
  getDate(date) {
    return moment(date).format('ll');
  }
  getName() {
    return this.restOrder[0].vid.name + '_' + moment(this.from).format('DDMMYYYY') + '_' + moment(this.to).format('DDMMYYYY');
  }
  getCurrency() {
    return this.api.getCurrecySymbol();
  }

  parseFloat(x:string){
    return parseFloat(x);
  }
  parseFloatToFixed(x){
    return parseFloat(x).toFixed(2);
  }
}
