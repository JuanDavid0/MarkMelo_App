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
      phone_user: ['', [Validators.required , Validators.pattern('^[+][0-9]{1,3}[0-9]{5,12}$')]] ,
      password_user: ['', [Validators.required, Validators.minLength(8), this.validateUppercase, this.validateSpecialCharacter, this.validateNumber]],
      confirm_password: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
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

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password_user')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirm_password')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirm_password')?.setErrors(null);
    }
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