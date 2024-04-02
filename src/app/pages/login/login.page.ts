import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import {
  SocialAuthService,
  GoogleSigninButtonModule,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { LoginFacebookGoogleModule } from 'src/app/shared/login-facebook-google/login-facebook-google.module';
import { from } from 'rxjs';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    LoginFacebookGoogleModule,
    GoogleSigninButtonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class LoginPage implements OnInit {
  params = {} as any;
  users: any[] = [];
  email = '';
  password = '';

  loginForm!: FormGroup;
  socialUser!: any;
  isLoggedin: any;
  ApiRestFulService = inject(ApiRestFulService);

  constructor(
    @Inject(SocialAuthService) private authService: SocialAuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    /*
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
    this.params.page = 0;
    */
    this.infLogin();
  }

  /**
   * Asigna los valores iniciales al formulario de inicio de sesión
   * @param event
   */
  infLogin(event?: any) {
    this.loginForm = this.formBuilder.group({
      email_user: ['', Validators.required],
      password_user: ['', Validators.required],
    });
  }

  /**
   * Realiza el inicio de sesión y segun la respuesta redirige a la pagina de usuarios
   * o muestra un mensaje de error
   */
  onLogin() {
    this.ApiRestFulService.postlogin(this.loginForm.value).subscribe(
      (response) => {
        if (response.status === 200) {
          this.router.navigate([this.ApiRestFulService.getRol()]);
        } else {
          console.error('Login failed with status:', response.status);
          alert('Inicio de sesión fallido');
        }
      }
    );
  }

  signInWithFB(): void {
    /*if (window.location.protocol !== 'https:') {
      console.error('Facebook login requires HTTPS. Please switch to HTTPS and retry.');
      return;
    }*/
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(() => {
        this.authService.authState.subscribe((user) => {
          this.socialUser = user;
          this.isLoggedin = user != null;
          alert('Facebook login success');
          console.log('Facebook login success:', user);
        });
      })
      .catch((error) => {
        alert('Facebook login failed');
        console.error('Facebook login failed:', error);
      });
  }

  signOut(): void {
    from(this.authService.signOut()).subscribe(
      () => {
        alert('User signed out');
        console.log('User signed out');
        this.isLoggedin = false;
      },
      (error) => {
        alert('User sign out failed');
        console.error('User sign out failed:', error);
      }
    );
  }
}
