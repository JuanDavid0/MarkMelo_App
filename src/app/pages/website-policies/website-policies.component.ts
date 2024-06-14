import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/pages/footer/footer.component';
import { HeaderComponent } from 'src/app/pages/header/header.component';

@Component({
  selector: 'app-website-policies',
  templateUrl: './website-policies.component.html',
  styleUrls: ['./website-policies.component.scss'],
  standalone:true,
  imports:
  [
    IonicModule,
    CommonModule,
    FooterComponent,
    HeaderComponent
  ]
})
export class WebsitePoliciesComponent  {}
