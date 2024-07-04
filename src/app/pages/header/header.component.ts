import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, ]
})

export class HeaderComponent implements OnInit{
  ApiRestFulService = inject(ApiRestFulService);
  userData: User | undefined;


  constructor(private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(){
    console.log("onInit Header");
    this.getInformationUser();
  }

  getInformationUser() {
    if (this.isOneUserLogged()) {
      this.ApiRestFulService.currentUser().subscribe((data: any) => {
        this.userData = data.results[0];
      });
    }
  }

  isOneUserLogged() {
    if (this.ApiRestFulService.isloggedIn()) {
      if (this.ApiRestFulService.isTokenExpired()) {
        this.ApiRestFulService.logout();
        alert('Sesión expirada, por favor vuelva a iniciar sesión');
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
  makeLogout(){
    this.ApiRestFulService.logout();
  }
  
}