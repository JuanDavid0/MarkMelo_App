import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
      email_user: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password_user: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    });
  }
  
  onRegister(){
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.apiRestFulService.register(this.registerForm.value).subscribe(response => {
        if (response.status === 200) {
          alert('REGISTRO EXITOSO!');
        } else {
          console.error('Login failed with status:', response.status);
          alert('Registro fallido! Intente nuevamente.');
        }
      });
    } else {
      alert('Por favor, complete el formulario correctamente.');
    }
  }

  ngOnInit() {
    console.log('singup');
    this.infRegister();
  }

}