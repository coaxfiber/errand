import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalService } from './../../global.service';
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password:string=''
  email:string=''
  warning=''
  constructor(private router: Router,private http: HttpClient,public global: GlobalService) { }

  ngOnInit(): void {
  }
  login(){ 
      this.warning=''
        let params = new HttpParams()
        .set('pass', 'login')
        .set('password', this.password)
        .set('email', this.email);

      this.http.post<any>(this.global.api,params).subscribe(
        (response) => { 
          console.log(response)
          if(response.message=="found"){
            localStorage.setItem('user',JSON.stringify(response.data))
            this.global.user=response.data
            this.router.navigate(['main']);
          }else {
            this.warning = 'Incorrect Username or Password'
          }
         },
        (error) => { console.log(error); });
       
  }
}
