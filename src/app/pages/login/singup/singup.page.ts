import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { inject} from '@angular/core';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SingupPage implements OnInit {

  registerForm!: FormGroup;
  ApiRestFulService = inject(ApiRestFulService);

  constructor(
    private formBuilder: FormBuilder,
    private apiRestFulService: ApiRestFulService
  ) { }


  infRegister(event?: any){
    this.registerForm = this.formBuilder.group({
      username_user: ['', Validators.required],
      email_user: ['', [Validators.required, Validators.email]],
      password_user: ['', [Validators.required, Validators.minLength(8), this.validateUppercase,this.validateSpecialCharacter,this.validateNumber]],
    });
  }
  
  validateUppercase(control: AbstractControl) {
    if (!/[A-Z]/.test(control.value)) {
      return { uppercase: true };
    }
    return null;
  }

  validateSpecialCharacter(control: AbstractControl) {
    if (!/[!@#$%^&.*]/.test(control.value)) {
      return { specialCharacter: true };
    }
    return null;
  }

  validateNumber(control: AbstractControl) {
    if (!/\d/.test(control.value)) {
      return { number: true };
    }
    return null;
  }

  onRegister(){
    if (this.registerForm.valid) {
        const email = this.registerForm.value.email;
      if (!this.apiRestFulService.isExistingEmail(email)) {
        console.log(this.registerForm.value);
        alert('Registro exitoso.');
        this.apiRestFulService.register(this.registerForm.value)
      } else {
        alert('El correo ya está registrado.');
      }
    } else {
      alert('Por favor, complete el formulario correctamente.');
    }
  }

  ngOnInit() {
    console.log('singup');
    this.infRegister();
  }

}