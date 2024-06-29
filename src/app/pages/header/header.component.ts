import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
  @Input() userData: User | undefined;

  constructor(private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(){
    console.log("onInit Header");
  }

  makeLogout(){
    this.ApiRestFulService.logout();
  }
  
}