import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import { GlobalService } from './../../global.service';
import { HttpClient, } from '@angular/common/http';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  fname:string=''
  lname:string=''
  email:string=''
  contact:string=''
  address:string=''
  password:string=''
  cpassword:string=''
  type:string=''
  constructor(private router: Router,public global:GlobalService,private http:HttpClient,) { }
 

  ngOnInit(): void {
  }

  warning=''
  save(){
    this.warning='';

    if(this.fname=='')
      this.warning+="*First Name is Required!\n"
    if(this.lname=='')
      this.warning+="*Last Name is Required!\n"
    if(this.email=='')
      this.warning+="*Email is Required!\n"
    if(!this.ValidateEmail(this.email))
      this.warning+="*Must enter a valid email!\n"
    if(this.contact=='')
      this.warning+="*Contact Number is Required!\n"
    if(this.address=='')
      this.warning+="*Address is Required!\n"
    if(this.password=='')
      this.warning+="*Password is Required!\n"
    if(this.password.length<4)
      this.warning+="*Password must be atleast 4 characters long!\n"
    if(this.type=='')
      this.warning+="*Type is Required!\n"
    if(this.password!=this.cpassword)
      this.warning+="*Password and Confirm Password did not match!\n"
    
      if(this.contact.length==11&&!(this.contact[0]=='0')&&!(this.contact[1]=='9'))
      this.warning+="*Contact number is invalid!\n"

      
      if(this.contact.length==10&&!(this.contact[0]=='9'))
      this.warning+="*Contact number is invalid!\n"
      if(this.contact.length<10)
      this.warning+="*Contact number is invalid!\n"
  
      
    if(this.warning==''){
      let formData = new FormData();
    
      formData.append('pass', 'register')
      formData.append('fname', this.fname)
      formData.append('lname', this.lname)
      formData.append('email', this.email)
      formData.append('contact', this.contact)
      formData.append('address', this.address)
      formData.append('password', this.password)
      formData.append('type', this.type)
      this.http.post<any>(this.global.api,formData).subscribe(
        (response) => { 
          console.log(response)
          if(response.message=="fail"){
            alert("Registration Failed! email maybe in use.")
          }else{
            alert("Registration Successfull!")
            this.router.navigate(['login']);
          }
          
         },
        (error) => { console.log(error); });
    }else
      alert(this.warning)
  }

  ValidateEmail(mail:any) 
  {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return true
    }
      return false
  }
}
