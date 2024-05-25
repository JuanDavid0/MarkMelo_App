import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent, IonHeader } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import {
  cart,
  chevronDownCircle,
  chevronExpandOutline,
  documentAttachOutline,
  eyeOutline,
  fileTrayFullOutline,
  heart,
  logoFacebook,
  megaphoneOutline,
  menuOutline,
  peopleOutline,
  personCircle,
  timeOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonHeader, IonContent, IonApp, IonRouterOutlet, HttpClientModule,],
})
export class AppComponent {
  constructor() {
    addIcons({
      'chevron-expand-outline': chevronExpandOutline,
      'eye-outline': eyeOutline,
      'person-circle': personCircle,
      'chevron-down-circle': chevronDownCircle,
      'menu-outline': menuOutline,
      'megaphone-outline': megaphoneOutline,
      'people-outline': peopleOutline,
      'time-outline': timeOutline,
      'file-tray-full-outline': fileTrayFullOutline,
      'document-attach-outline': documentAttachOutline,
      'logo-facebook': logoFacebook,
      'heart': heart,
      'cart': cart,
    });
  }
}
