import { Component, OnInit } from '@angular/core';

import { GlobalService } from './../../../global.service';
import { HttpClient, } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer ,public global:GlobalService,private http:HttpClient,) { }
  search:string=''
  placearray:any=[]
  placearrayorig:any=[]
  ngOnInit(): void {
    this.loadall()
  }
  loadall(x:any=null){
    let formData = new FormData();
    
    formData.append('pass', 'getplaces')
    this.http.post<any>(this.global.api,formData).subscribe(
      (response) => { 
        this.placearray = response.data
        this.placearrayorig = response.data
        console.log(response)
        if(x==1){
          this.placeselected = this.placearrayorig[this.placearrayorig.length-1]
        }
       },
      (error) => { console.log(error); });
  }
  placeselected:any={
    address: "Annafunan Mabazza St.3500 Tuguegarao City, Cagayan\r\n",
    created: "Oct 30, 2019",
    descrip: "",
    id: "",
    lat: "17.641391",
    lng: "121.721222",
    locid: "1",
    name: "Sol's Panceteria",
    photo: "iVBORw0KGgoAAAANSUhEUgAAAGQAAABiCAYAAACmu3ZJAAAAC",
    type: "1",
  }
  checkselected(a:any){
    if(a.id==this.placeselected.id)
      return "selected"
    return ''
  }

  selectplace(a:any){
    
    this.placeselected = a
    this.photo = this.getphoto(this.placeselected.photo)
    this.pic = 'data:image/jpeg;base64,'+this.placeselected.photo
    //this.getriderdetailpix(this.orderselect.riderid)
  }
  searchplace(){
    this.placearray=[]
    for (let index = 0; index < this.placearrayorig.length; index++) {
      if( this.placearrayorig[index].name.toLowerCase().includes(this.search.toLowerCase()))
        this.placearray.push(this.placearrayorig[index])
    }
  }

  getphoto(a:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+a)
  }

  handleMissingImage(event: Event) {
    this.photo = '/assets/images/nopic.jpg'
  }

  pic:any
  photo:any=''
  base64result:any=''
  imageUpload(event:any)
  {
    var file = event.target.files.length;
    for(let i=0;i<file;i++)
    {
       var reader = new FileReader();
       reader.onload = (event:any) => 
       {
        
        this.pic=event.target.result
        this.photo=this.pic;
          // console.log(event.target.result)
           //this.changeDetector.detectChanges();
       }
       reader.readAsDataURL(event.target.files[i]);
    }
  }
  Delete(){
    let formData = new FormData();
    
    formData.append('pass', 'deleteplace')
    formData.append('id', this.placeselected.id)
    this.http.post<any>(this.global.api,formData).subscribe(
      (response) => { 
        console.log(response)
        if(response.message=="failed"){
          //alert("file too big!")
        }else{
          alert("Place Deleted!")
          this.loadall(1)
        }
        
       },
      (error) => { console.log(error); });
  }

  save(){
    var base64result = this.pic.substr(this.pic.indexOf(',') + 1);

    let formData = new FormData();
    
    formData.append('pass', 'updateplace')
    formData.append('id', this.placeselected.id)
    formData.append('name', this.placeselected.name)
    formData.append('descrip', this.placeselected.descrip)
    formData.append('address', this.placeselected.address)
    formData.append('type', this.placeselected.type)
    formData.append('photo', base64result)
    this.http.post<any>(this.global.api,formData).subscribe(
      (response) => { 
        console.log(response)
        if(response.message=="failed"){
          alert("file too big!")
        }else{
          this.loadall(1)
        }
        
       },
      (error) => { console.log(error); });
  }

  addplace(){
    this.placeselected ={
      address: "",
      created: "",
      descrip: "",
      id: "0",
      lat: "",
      lng: "",
      locid: "",
      name: "",
      photo: "",
      type: "",
    }
  }
}
