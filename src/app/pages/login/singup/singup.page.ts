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
    private formBuilder: FormBuilder, // Inyección de dependencias para el FormBuilder.
    private apiRestFulService: ApiRestFulService // Inyección de dependencias para el servicio de la API RESTful.
  ) { }

  /**
   * Método para inicializar el formulario de registro.
   * @param event Evento opcional que puede desencadenar la inicialización del formulario.
   */
  infRegister(event?: any){
    this.registerForm = this.formBuilder.group({
      username_user: ['', Validators.required],
      email_user: ['', [Validators.required, Validators.email]],
      phone_user: ['',] ,
      password_user: ['', [Validators.required, Validators.minLength(8), this.validateUppercase,this.validateSpecialCharacter,this.validateNumber]],
    });
  }

  /**
   * Validaciones de la contraseña del usuario.
   * @param control Control de formulario que se va a validar.  
   * @returns Retorna un objeto con la validación correspondiente.
   */

  validateUppercase(control: AbstractControl) { //Valida si la contraseña tiene al menos una letra mayúscula.
    if (!/[A-Z]/.test(control.value)) {
      return { uppercase: true };
    }
    return null;
  }

  validateSpecialCharacter(control: AbstractControl) { //Valida si la contraseña tiene al menos un carácter especial.
    if (!/[!@#$%^&.*]/.test(control.value)) {
      return { specialCharacter: true };
    }
    return null;
  }

  validateNumber(control: AbstractControl) { //Valida si la contraseña tiene al menos un número.
    if (!/\d/.test(control.value)) {
      return { number: true };
    }
    return null;
  }

  /**
   * Método para formatear el número de teléfono.
   */
  formatPhone() {
    const countryCodeInput = document.getElementById('country_code') as HTMLInputElement;
    const countryCode = countryCodeInput.value;
    if (countryCode.trim() !== '' && this.registerForm.value.phone_user.trim() !== '') {
      console.log(countryCodeInput.value);
      this.registerForm.patchValue({
        phone_user: "+"+ countryCodeInput.value + "_" + this.registerForm.value.phone_user
      });
    } else {
      this.registerForm.patchValue({
        phone_user: 'NULL'
      });
    }
  }

  /**
   * Método para verificar si las contraseñas coinciden.
   * @returns Retorna un valor booleano que indica si las contraseñas coinciden.
   */
  checkPasswords() {
    const password = this.registerForm.get('password_user')?.value;
    const confirmPassword = document.getElementById('confirm_password') as HTMLInputElement;
    return password !== confirmPassword.value;
  }

  /**
   * Método para registrar un usuario.
   */
  onRegister(){
    if (this.registerForm.valid) {
      if (this.checkPasswords()) {
        alert('Las contraseñas no coinciden.');
      } else {
        this.formatPhone();
        this.apiRestFulService.register(this.registerForm.value).subscribe(response => {
        }, error => {
          alert('Registro fallido! Intente nuevamente.');
        });
      }
    } else {
      alert('Por favor, complete el formulario correctamente.');
    }
  }

  /**
   * Inicializa la página de registro.
   */
  ngOnInit() {
    this.infRegister();
  }

}