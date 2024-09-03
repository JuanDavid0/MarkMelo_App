import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  apps,
  cart,
  chevronDownCircle,
  chevronExpandOutline,
  create,
  documentAttachOutline,
  eyeOutline,
  fileTrayFullOutline,
  heart,
  logoFacebook,
  megaphoneOutline,
  menuOutline,
  peopleOutline,
  personCircle,
  removeOutline,
  timeOutline,
  trashOutline,
} from 'ionicons/icons';

import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonHeader, IonContent, IonApp, IonRouterOutlet, HttpClientModule,],
})

export class AppComponent {
  constructor() {
    // Añade los iconos que se van a utilizar en la aplicación
    addIcons({
      'chevron-expand-outline': chevronExpandOutline,
      'eye-outline': eyeOutline,
      'person-circle': personCircle,
      'chevron-down-circle': chevronDownCircle,
      'menu-outline': menuOutline,
      'megaphone-outline': megaphoneOutline,
      'people-outline': peopleOutline,
      'apps': apps,
      'file-tray-full-outline': fileTrayFullOutline,
      'document-attach-outline': documentAttachOutline,
      'logo-facebook': logoFacebook,
      'heart': heart,
      'cart': cart,
      'create': create,
      'trash-outline': trashOutline,
      'timer-outline': timeOutline,
      "add-outline": addOutline,
      "remove-outline": removeOutline,
    });
  }
}
