import { Component, OnInit } from '@angular/core';

import { GlobalService } from './../../../global.service';
import { HttpClient, } from '@angular/common/http';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  op=''
  np=''
  cp=''
  loader:boolean = false
  constructor(public global:GlobalService,private http:HttpClient,) { }
  
  

  ngOnInit(): void {
  }
  save(){
    this.loader=true
    var warn = ''
    if(this.op=='')
      warn+="Current password is required!\n"
      if(this.np=='')
        warn+="New password is required!\n"
        if(this.cp=='')
          warn+="Confirm password is required!\n"
    if(this.np!=this.cp)
      warn+="New Password and Confirm Password does not match!\n"
      
    if(this.np.length<4)
      warn+="*Password must be atleast 4 characters long!\n"
    if(!(warn=='')){
      alert(warn)
    }
    else{
    let formData = new FormData();
    
    formData.append('pass', 'changepassword')
    // formData.append('op', this.op)
    formData.append('np', this.np)
    // formData.append('id', this.global.user.id);
    formData.append('p', this.op)
    formData.append('email', this.global.user.email)

      this.http.post<any>(this.global.api,formData).subscribe(
        (response) => { 
          console.log(response)
          if(response.message=="success"){
            alert("Update Success!")
            this.op=''
            this.np=''
            this.cp=''
          }else {
            alert("Wrong Current Password")
          }
          this.loader=false
          console.log(response)
         },
        (error) => { console.log(error);
          this.loader=false });
    }
  }
}
