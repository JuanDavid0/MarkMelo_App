import { Component, Input, OnInit, inject } from '@angular/core';
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

export class HeaderComponent{
  ApiRestFulService = inject(ApiRestFulService);
  @Input() userData: User | undefined;

  prueba(){
    console.log("Hola");
  }
  
  logout() {
    this.ApiRestFulService.logout();
  }
}