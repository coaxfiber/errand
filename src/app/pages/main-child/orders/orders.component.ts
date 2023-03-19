import { Component, OnInit } from '@angular/core';

import { GlobalService } from './../../../global.service';
import { HttpClient, } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  constructor(private sanitizer: DomSanitizer ,public global:GlobalService,private http:HttpClient,) { }
  loader=false
  orderarray:any=[]
  orderarrayorig:any=[]
  ngOnInit(): void {
    this.loadall()
  }
  loadall(x:any = null){
    this.loader=true
    let formData = new FormData();
    
    formData.append('pass', 'gettransactionall')
    this.http.post<any>(this.global.api,formData).subscribe(
      (response) => { 
        if(response.message=="found"){
          this.orderarray=response.data
          this.orderarrayorig=response.data
          if(x==1){
            for (let index = 0; index < this.orderarrayorig.length; index++) {
              if(this.orderarrayorig[index].id == this.orderselect.id)
                {
                  this.orderselect=this.orderarrayorig[index]
                }
            }
          }
        }
        console.log(this.orderarray)
        this.getriders()
       },
      (error) => { console.log(error); });
  }
  riders:any=[]
  ridersorig:any=[]
  searchrider=''
  getriders(){
    let formData = new FormData();
    
    formData.append('pass', 'userlist')
    formData.append('type', 'rider')
    this.http.post<any>(this.global.api,formData).subscribe(
      (response) => { 
        if(response.message=="found"){
          this.riders = response.data
          this.ridersorig = response.data
          if(this.orderselect.id!=''){
            this.getriderdetailpix(this.orderselect.riderid)
          }
        }
        console.log(response)
       },
      (error) => { console.log(error); });
  }
  shpend:boolean=false
  showpending(event:any){
    this.search=''
    if(!this.shpend){
      this.orderarray = []
      for (let index = 0; index < this.orderarrayorig.length; index++) {
        if( this.orderarrayorig[index].status=="Pending")
          this.orderarray.push(this.orderarrayorig[index])
      }
    }else{
      this.orderarray = this.orderarrayorig
    }
  }

  orderselect:any={
    address: "Annafunan Mabazza St.3500 Tuguegarao City, Cagayan\r\n",
    contact: "09123456789",
    deliverto: "P. sherman wallaby way sydney Australia America",
    deliveryType: "food",
    description: "sdca",
    distance: "0",
    id: "",
    lat: "17.641391",
    lng: "121.721222",
    paidby: "COD",
    place_id: "2",
    placename: "Sol's Panceteria",
    price: "0",
    rider: "",
    riderid: "0",
    status: "Delivered",
    timestamp: "Apr 4, 2022",
    type: "1",
    user_id: "2",
    username: "test1@gmail.com"
  }
  checkselected(a:any){
    if(a.id==this.orderselect.id)
      return "selected"
    return ''
  }
  selectorder(a:any){
    this.orderselect = a
    this.getriderdetailpix(this.orderselect.riderid)
  }
  handleMissingImage(event: Event) {
    this.photo = '/assets/images/nopic.jpg'
  }
  search=''
  searchorder(){
    this.shpend=false
    var temp =  this.orderarrayorig
    this.orderarray=[]
    for (let index = 0; index < temp.length; index++) {
      if( temp[index].id.includes(this.search))
        this.orderarray.push(this.orderarrayorig[index])
    }
  }

  searchorderrider(){
    this.riders=[]
    for (let index = 0; index < this.ridersorig.length; index++) {
      if( (this.ridersorig[index].fname.toLowerCase()+this.ridersorig[index].lname.toLowerCase()).includes(this.searchrider.toLowerCase()))
        this.riders.push(this.ridersorig[index])
    }
  }

  assignrider(id:any){
    let formData = new FormData();
    
    formData.append('pass', 'updaterider')
    formData.append('riderid', id)
    formData.append('id', this.orderselect.id)
    
    this.http.post<any>(this.global.api,formData).subscribe(
      (response) => { 
        this.loadall(1)
       },
      (error) => { console.log(error); });

  }


  getriderdetail(x:any){
    for (let index = 0; index < this.ridersorig.length; index++) {
      if(x==this.ridersorig[index].id)
        return this.ridersorig[index]
    }
  }

  photo:any='/assets/images/nopic.jpg'
  getriderdetailpix(x:any){
    for (let index = 0; index < this.ridersorig.length; index++) {
      if(x==this.ridersorig[index].id)
        this.photo =  this.sanitizer.bypassSecurityTrustResourceUrl(this.ridersorig[index].photo)
    }
  }
  checkifhasactive(x:any){
    for (let i = 0; i < x.length; i++) {
      if(x[i].status == "Assigned")
        return 'red'
    }
    return ''
  }

  getactivetrans(x:any){
    var y=0
    for (let i = 0; i < x.length; i++) {
      if(x[i].status == "Assigned")
        y++
    }
    return y
  }
}
