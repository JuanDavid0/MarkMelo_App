import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IonicSlides} from '@ionic/angular';
import { Banner } from 'src/app/models/banner.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BannerComponent implements OnInit {
  @Input() banners: Banner[] = [];

  swiperModules = [IonicSlides];

  constructor() {}

  ngOnInit() {
    console.log('BannerComponent');
  }

  prueba(){
    console.log('prueba');
  }

}
