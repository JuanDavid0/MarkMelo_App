import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-vista-productos',
  templateUrl: './vista-productos.component.html',
  styleUrls: ['./vista-productos.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VistaProductosComponent implements OnInit {
  @Input() products: Product[] = [];
  swiperModules = [IonicSlides];
  constructor() {}

  ngOnInit() {
    console.log('VistaProductosComponent');
  }

  prueba(){
    console.log('seleccione un prueba');
  }
  
  breakpoints = {
    320: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 15,
    },
  };
}
