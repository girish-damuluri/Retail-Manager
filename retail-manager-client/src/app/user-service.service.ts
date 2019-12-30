import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getShopsData(){
    let url = "http://localhost:8080/api/retail/getStoreData";
    return this.http.get(url);
  }
  addShops(reqObj): any{
     let url = "http://localhost:8080/api/store/create"
     return this.http.post(url,reqObj);
  }

}
