import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { GlobalService } from './../../global.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router,public global:GlobalService,) { }

  user:any = null
  ngOnInit(): void {
    this.user = localStorage.getItem('user')
    //console.log(this.user)
    if(this.user!=null){
      this.global.user=JSON.parse(this.user)
    }else 
      this.router.navigate(['login']);
  }
  clickProfile(x:any){
    if(x==0)
    this.router.navigate(['main/profile']);
    if(x==1)
    this.router.navigate(['main/orders']);
    if(x==2)
    this.router.navigate(['main/partner']);
    if(x==3)
    this.router.navigate(['main/changepass']);
  }

}
