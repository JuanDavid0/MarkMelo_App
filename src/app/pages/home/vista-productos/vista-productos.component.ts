import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
import { Category } from 'src/app/models/categories';
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
  @Input() mainCategories: any[] = [];
  @Input() topViewedProducts: Product[] = [];

  swiperModules = [IonicSlides];
  idSelected?: number;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('VistaProductosComponent-OnInit');
  }

  setInformationForOneProduct(){
    this.router.navigate(['/products', this.idSelected]);
  }

  setInformationForOneCategory(){
    this.router.navigate(['/categories', this.idSelected]);
  }
  navigateToLogin(event: Event) {
    event.stopPropagation();
    alert('le has dado me gusta');
  }
  navigateToCart(event: Event) {
    event.stopPropagation();
    alert('se ha añadido al carrito');
  }

  breakpointsForProducts = {
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
  
  breakpointsForCategories = {
    320: {
      slidesPerView: 3.5,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 4.5,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 6,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 7,
      spaceBetween: 15,
    },
    1280: {
      slidesPerView: 9,
      spaceBetween: 15,
    },
  };


}
