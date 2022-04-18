import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IOrder, OrderList } from 'src/models/IOrder';
import { SeoService } from '../services/seo.service';
import { fncUser } from '../util';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  order:OrderList []= []

  constructor( 
    private http:HttpClient,
    private seo :SeoService
    ) { }

  ngOnInit(): void {
    this.seo.updateTitle("Order")
   const user  = fncUser();
   if(user !=null){
     //https://www.jsonbulut.com/json/orderList.php?ref=c7c2de28d81d3da4a386fc8444d574f2&musterilerID=3056
     const url='https://www.jsonbulut.com/json/orderList.php';
     const sendParams = {
       ref:'c7c2de28d81d3da4a386fc8444d574f2',
       musterilerID:user.userId
     }
     const newThis = this
     this.http.get<IOrder>( url, { params:sendParams } ).subscribe({
       next(res){
        newThis.order=res.orderList![0]
       },
       error(err){
       console.error(err.message)
       }
     })
   }

  }

}
