import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  type='rider'
  api = "https://appsystem.online/2g2w/2g2w/";
  //api = "http://localhost:8012/2g2w/";
  user:any = null
  constructor() { }
}
