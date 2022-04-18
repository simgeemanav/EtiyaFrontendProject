import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser , faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { decrypt, rememberControl } from 'src/app/util';
import { Bilgiler } from 'src/models/IUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser = faUser;
  farightfrombracket = faRightFromBracket;
  user:Bilgiler ={
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: ''
  }

  constructor( private router:Router) { 
    rememberControl();
    const stUser = sessionStorage.getItem('user');
    if( stUser ){
        //giris var
        try {
          //hata olma olasılıgı olan kodlar
          this.user = JSON.parse( decrypt(stUser) );
        } catch (error) {
          //hata oldugunda calısacak kodlar
           sessionStorage.removeItem('user')
           this.router.navigate(['/'])
        }
    }else{
      // giris yok
      this.router.navigate(['/'])
    }
  }

  



  ngOnInit(): void {
  }

}
