import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressList, IAddress } from '../../models/IAddress';
import { fncDateConvert, fncUser } from '../util';
import {faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { SeoService } from '../services/seo.service';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  faDeleteLeft = faDeleteLeft
  address: AddressList = {}
  allAddress:AddressList[]=[]
  modelAddress:AddressList= { }


  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    public ngxSmartModalService: NgxSmartModalService,
    private seo: SeoService
    ) {

  }

  ngOnInit(): void {
    this.fncAllAddress()
    this.seo.updateTitle("Address")
  }

  fncAllAddress() {
    const bilgi = fncUser()
    if (bilgi !== null) {
      const newThis = this
      const url = 'https://www.jsonbulut.com/json/addressList.php'
        const sendParams = {
          ref: 'c7c2de28d81d3da4a386fc8444d574f2',
          musterilerID: bilgi.userId
        }
        this.http.get<IAddress>(url,{params:sendParams}).subscribe({
          next(res){
            newThis.allAddress = res.addressList!
            console.log(newThis.allAddress)
          },
          error(err){
              console.error(err.message)
          }
        })

    }
  }

  fncAddressAdd() {

    const bilgi = fncUser()
    if (bilgi !== null) {
      this.address.musterilerID = bilgi.userId

      if (this.address.il === undefined || this.address.il === "") {
        this.toast.error("City Empty!")
      } else if (this.address.ilce === undefined || this.address.ilce === "") {
        this.toast.error("District Empty!")
      } else if (this.address.Mahalle === undefined || this.address.Mahalle === "") {
        this.toast.error("Neighborhood Empty!")
      } else if (this.address.adres === undefined || this.address.adres === "") {
        this.toast.error("Address Empty!")
      } else if (this.address.kapiNo === undefined || this.address.kapiNo === "") {
        this.toast.error("No Empty!")
      } else if (this.address.not === undefined || this.address.not === "") {
        this.toast.error("Note Empty!")
      } else {
        //datalar var ve servise gönderimini sağla

        const url = 'https://www.jsonbulut.com/json/addressAdd.php'
        const sendParams = {
          ref: 'c7c2de28d81d3da4a386fc8444d574f2',
          musterilerID: this.address.musterilerID,
          il: this.address.il,
          ilce: this.address.ilce,
          Mahalle: this.address.Mahalle,
          adres: this.address.adres,
          kapiNo: this.address.kapiNo,
          notBilgi: this.address.kapiNo

        }
        const newThis=this
        this.http.get(url, { params: sendParams }).subscribe({
          next(res) {
            newThis.fncAllAddress()
          },
          error(err) {
            console.error(err.message)
          }
        })
      };
    }
  }
  fncRemove( adresID:string ){
    const bilgi = fncUser()
    if (bilgi !== null) {
      //https://www.jsonbulut.com/json/addressDelete.php?ref=c7c2de28d81d3da4a386fc8444d574f2&musterilerID=35&adresID=7
    const url = 'https://www.jsonbulut.com/json/addressDelete.php'
    const sendParams ={
      ref:'c7c2de28d81d3da4a386fc8444d574f2',
      musterilerID:bilgi.userId,
      adresID:adresID
    }
    const newThis=this
     this.http.get( url,{ params:sendParams } ).subscribe({
       next(res){
         newThis.fncAllAddress()
       },
       error(err){
         console.error(err.message)
       }
     })
  }
}

//AddressDetail

fncDetail(index:number){
const item = this.allAddress[index]
if(item.tarih){
  const newTarih = fncDateConvert(item.tarih.toString());
  item.tarih = newTarih
}
this.modelAddress = item
}

}
