import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/models/IUser';
import { SeoService } from '../services/seo.service';
import { encrypt, rememberControl } from '../util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  


  constructor(
    private fb:FormBuilder, 
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private seo: SeoService
     ) {
       //kullanıcı daha önce beni hatırla demiş ise 
       //kullanıcıyı direkt olarak admine gönder

       const status = rememberControl();
       if(status===true){
         this.router.navigate(['/admin'])
       }
      }

  userForm = this.fb.group({
    email:'',
    password:'',
    remember : false //formcontrolname ile ayn olmalı
  })

  ngOnInit(): void {

    this.seo.updateTitle("Admin Login")
    this.seo.updateMeta("content", "Admin Login Page")

    this.userForm = new FormGroup({
      email: new FormControl( this.userForm.value.email, [
        Validators.required, Validators.email
      ]),

      password: new FormControl(this.userForm.value.password,[
        Validators.required
      ]),
      remember: new FormControl ( this.userForm.value.remember, [] )
    })
  }

  //GET METHODS
  get email(){
     return this.userForm.get('email')
  }
  get password(){
    return this.userForm.get('password')
 }


  fncLogin(){
    const email = this.email?.value
    const password = this.password?.value
    // console.log('Form Sending', email,password)
    const remember  = this.userForm.value.remember

  //https://www.jsonbulut.com/json/userLogin.php?ref=c7c2de28d81d3da4a386fc8444d574f2&userEmail=zehra@mail.com&userPass=12345&face=no
   const url = 'https://www.jsonbulut.com/json/userLogin.php'
   const sendParams = {
    ref:'c7c2de28d81d3da4a386fc8444d574f2',
    userEmail:email,
    userPass:password,
    face:'no'
   }

   // SEND DATA
     const newToast = this.toastr
    const newRouter = this.router
     this.http.get<IUser>(url, {params:sendParams}).subscribe({
     next( res ) {
       const user = res.user[0] //res tüm cevabı temsil eder. bilgiler user'ın icindeki 0. üyenin icinde 
       const durum = user.durum
       const mesaj = user.mesaj
       if ( durum === true ) {
       //console.log(durum,mesaj)
       newToast.success(
        mesaj, 'Giriş İşlemi'
      ) 
         //giris basarılı
         //sessionStorage'a kullanıcı bilgilerini sakla

         const us = user.bilgiler;
         if ( us ) {
          const stUs = JSON.stringify(us);
          sessionStorage.setItem('user', encrypt(stUs) );

         //remember => true

         if(remember===true){
             localStorage.setItem('user', encrypt(stUs))
         }
            newRouter.navigate(['/admin'])
          }
       }else{
         //giris basarısız
         newToast.clear() // dismiss
         newToast.error(mesaj, "Hata");
       }
     },
     error( err ){
      console.error(err)
        newToast.error(err.message,'Giriş İşlemi')
     }
   })
  }

}


