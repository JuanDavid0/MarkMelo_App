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
import { LoginFacebookGoogleModule } from 'src/app/shared/login-facebook-google.module';
import { ApiRestFulService } from 'src/app/services/api-rest-ful.service';
import { Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
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
  email = '';
  password = '';
  loginForm!: FormGroup;
  socialUser!: any;
  isLoggedin: any;
  ApiRestFulService = inject(ApiRestFulService);
  rol_user: String = '';

  private googleToken: any;
  private facebookToken: any;

  constructor(
    @Inject(SocialAuthService) private authService: SocialAuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  /**
   * Inicializa el componente de inicio de sesión
   */
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      this.onGoogleSocialLogin(user);
    });
    this.setUserRol();
    this.params.page = 0;
    this.infLogin();
  }
  /**
   * Muestra u oculta la contraseña del campo de contraseña.
   */
  togglePasswordVisibility() {
    let password = document.getElementById('password') as HTMLInputElement;
    if (password.type == 'password') {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
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

  setUserRol() {
    if(this.ApiRestFulService.isloggedIn()){
      this.ApiRestFulService.getRol().subscribe((response) => {
        if (response.status === 200) {
          this.rol_user = response.results[0].rol_user;
        } else {
          alert('No se pudo obtener el rol del usuario, porque no has inciado sesión');
          throw new Error('Error al obtener el rol del usuario');   
        }
      });
    }else{
      this.rol_user = '';
    }
  }

  /**
   * Realiza el inicio de sesión y segun la respuesta redirige a la pagina home o admin
   * o muestra un mensaje de error
   */
  onLogin() {
    this.ApiRestFulService.postlogin(this.loginForm.value).subscribe(
      (response) => {
        if (response.status === 200) {
          if (this.rol_user == 'admin') {
            this.router.navigate(['/admin']).then(() => {
              window.location.reload();
            });
          } else {
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          }
        } else {
          alert('Inicio de sesión fallido');
        }
      }
    );
  }

  /**
   * Realiza el inicio de sesión con Facebook
   */
  signInWithFB(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((response) => {
        this.socialUser = response;
        this.isLoggedin = response != null;
        this.facebookToken = response.authToken;
        this.onFacebookSocialLogin(response);
      });
  }

  /**
   * Realiza el proceso de insersion de un usuario registrado con Google
   * @param user
   */
  onGoogleSocialLogin(user: any) {
    this.ApiRestFulService.registerGoogleSocial(user).subscribe((response) => {
      if (response.status === 200) {
        if (this.rol_user == 'admin') {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['home']);
        }
      } else {
        alert('Inicio de sesión fallido');
      }
    });
  }

  /**
   * Realiza el proceso de insersion de un usuario registrado con Facebook
   * @param user
   */
  onFacebookSocialLogin(user: any) {
    this.ApiRestFulService.registerFacebookSocial(user).subscribe(
      (response) => {
        if (response.status === 200) {
          if (this.rol_user == 'admin') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['home']);
          }
        } else {
          alert('Inicio de sesión fallido');
        }
      }
    );
  }
}
