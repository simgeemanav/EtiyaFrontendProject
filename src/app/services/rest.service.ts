import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from 'src/models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor( private http: HttpClient ) { }
  baseUrl='https://www.jsonbulut.com/json/'
  ref = 'c7c2de28d81d3da4a386fc8444d574f2'

  //All Product
  
  allProduct(){
    const url = this.baseUrl + 'product.php'
    const sendParams = {
      ref:this.ref,
      start:'0'
    }
    return this.http.get<IProduct>(url, {params: sendParams})
  }

}
