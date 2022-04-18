import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bilgiler, IUser } from '../../models/IUser';
import { decrypt } from '../util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:Bilgiler = {
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: ''
  }
  password = ''

  constructor( 
    private toastr:ToastrService, 
    private http: HttpClient 
    ) {

    const stUser = sessionStorage.getItem('user');
    if ( stUser ) {
      try {
        this.user = JSON.parse( decrypt(stUser) );
      } catch (error) {
        sessionStorage.removeItem('user')
      }
    }

   }

  ngOnInit(): void {
  }


  fncUpdate() {
    console.log(this.user.userName)
    
    if ( this.user.userName === "" ) {
        this.toastr.error("Name Empty!")
    }else if ( this.user.userSurname === "" ) {
      this.toastr.error("Surname Empty!")
    }else if ( this.user.userEmail === "" ) {
      this.toastr.error("Email Empty!")
    }else if ( this.user.userPhone === "" ) {
      this.toastr.error("Phone Empty!")
    }else if ( this.password === "" ) {
      this.toastr.error("Password Empty!")
    }else {
      
      // datalar var ve servise gönderimi sağla
      const url = 'https://www.jsonbulut.com/json/userSettings.php'
      const sendParams = {
        ref: 'c7c2de28d81d3da4a386fc8444d574f2',
        userName: this.user.userName,
        userSurname: this.user.userSurname,
        userMail: this.user.userEmail,
        userPhone: this.user.userPhone,
        userPass: this.password,
        userId: this.user.userId
      }

      const newThis = this
      this.http.get<IUser>(url, {params: sendParams}).subscribe({
        next(res) {
          const u = res.user[0]
          const durum = u.durum
          const mesaj = u.mesaj
          if ( durum === true ) {
            const stUser = JSON.stringify( newThis.user )
            sessionStorage.setItem('user', stUser)
            newThis.toastr.success(mesaj)
            setTimeout(() => {
              window.location.reload()
            }, 2000);
          }else {
            newThis.toastr.error(mesaj)
          }
        },
        error(er) {
          console.error( er.message )
        }       
      })

    }

  }

}