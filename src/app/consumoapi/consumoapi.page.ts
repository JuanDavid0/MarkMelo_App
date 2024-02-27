import { ApiRestFulService } from './../services/api-rest-ful.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-consumoapi',
  templateUrl: './consumoapi.page.html',
  styleUrls: ['./consumoapi.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class ConsumoapiPage implements OnInit {

  users: any[] = [];
  
  ApiRestFulService = inject(ApiRestFulService);

  constructor(
    private apiRestFulService: ApiRestFulService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(event?: any){
    this.apiRestFulService.getUsers().subscribe({
      next: (res: any) => {
        console.log(res);
      }
    });

  }

}
