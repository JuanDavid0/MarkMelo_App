import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { User } from 'src/app/models/user.model';

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

  prueba(){
    console.log("Hola");
  }
  ngOnInit(){
    this.showCurrentUser();
  }

  showCurrentUser() {
    if (this.ApiRestFulService.isloggedIn()){
      this.ApiRestFulService.currentUser().subscribe((user: any) => {
        console.log(user.results[0]);
        this.userData = user.results[0];
      });
    }
    console.log('usuario' + this.userData);
  }

  logout() {
    this.ApiRestFulService.logout();
  }
}