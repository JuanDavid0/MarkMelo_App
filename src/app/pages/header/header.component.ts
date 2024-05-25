import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, ]
})

export class HeaderComponent {
  ApiRestFulService = inject(ApiRestFulService);

  prueba() {
    console.log('prueba');
  }

  logout() {
    this.ApiRestFulService.logout();
  }
}