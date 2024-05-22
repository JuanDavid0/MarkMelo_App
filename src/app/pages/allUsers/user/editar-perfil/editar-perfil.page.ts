import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { count } from 'rxjs';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class EditarPerfilPage implements OnInit {

  ApiRestFulService = inject(ApiRestFulService);
  editar!: FormGroup;
  userData: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  infLogin(event?: any) {
    this.editar = this.formBuilder.group({
      country_user: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
      city_user: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
      address_user: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
      phone_user: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
    });
  }

  formatPhone() {
    const countryCodeInput = document.getElementById('country_code') as HTMLInputElement;
    const countryCode = countryCodeInput.value;
    if (countryCode.trim() !== '' && this.editar.value.phone_user.trim() !== '') {
      console.log(countryCodeInput.value);
      this.editar.patchValue({
        phone_user: "+"+ countryCodeInput.value + "_" + this.editar.value.phone_user
      });
    } 
  }

  updateProfile() {
    this.formatPhone();
    console.log('intento de editar perfl');
    this.ApiRestFulService.updateUserInfo(this.editar)
  }

  showCurrentUser() {
    this.ApiRestFulService.currentUser().subscribe((data: any) => {
      this.userData = data;
    });
  }

  ngOnInit() {
    this.infLogin();
    this.showCurrentUser();
  }
}