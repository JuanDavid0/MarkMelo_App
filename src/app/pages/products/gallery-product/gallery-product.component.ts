import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IonicSlides} from '@ionic/angular';

@Component({
  selector: 'app-gallery-product',
  templateUrl: './gallery-product.component.html',
  styleUrls: ['./gallery-product.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class GalleryProductComponent  implements OnInit {

  @Input() GalleryProductComponent: GalleryProductComponent[] = [];

  swiperModules = [IonicSlides];

  constructor() {}

  ngOnInit() {

  }

  prueba(){
  }

}
