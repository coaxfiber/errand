import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import { GlobalService } from './../../../global.service';
import { HttpClient, } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fname=''
  mname=''
  lname=''
  address=''
  contact=''
  constructor(public global:GlobalService,private sanitizer: DomSanitizer ,private http:HttpClient,) { }
  
  
  photo:any
  pic:any
  ngOnInit(): void {
    this.fname=this.global.user.fname
    this.mname=this.global.user.mname
    this.lname=this.global.user.lname
    this.address=this.global.user.address
    this.contact=this.global.user.contact
    this.pic=this.global.user.photo
    if(this.global.user.photo!='/assets/images/nopic.jpg')
      this.photo=this.sanitizer.bypassSecurityTrustResourceUrl(this.global.user.photo);
  }
  
  handleMissingImage(event: Event) {
    this.photo = '/assets/images/nopic.jpg'
  }

  loader:boolean =false
  save(){
    this.loader=true
    let formData = new FormData();
    
    formData.append('pass', 'updateinfo')
    formData.append('fname', this.fname)
    formData.append('mname', this.mname)
    formData.append('lname', this.lname)
    formData.append('address', this.address)
    formData.append('contact', this.contact)
    formData.append('photo', this.pic)
    formData.append('id', this.global.user.id);

      this.http.post<any>(this.global.api,formData).subscribe(
        (response) => { 
          console.log(response)
          if(response.message=="found"){
            this.global.user=response.data
            alert("Update Success!")
          }else {
            alert("File too large")
          }
          this.loader=false
          console.log(response)
         },
        (error) => { console.log(error);
          this.loader=false });
  }

  changeDetector:any
  imageUpload(event:any)
  {
    var file = event.target.files.length;
    for(let i=0;i<file;i++)
    {
       var reader = new FileReader();
       reader.onload = (event:any) => 
       {
        
        this.pic=event.target.result
        this.photo=this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
          // console.log(event.target.result)
           //this.changeDetector.detectChanges();
       }
       reader.readAsDataURL(event.target.files[i]);
    }
  }
  
}
