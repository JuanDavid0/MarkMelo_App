import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
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
import { AuthService } from 'src/app/services/auth.service';
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
  authServiceLogin = inject(AuthService);
  router = inject(Router);

  constructor(
    @Inject(SocialAuthService) private authService: SocialAuthService,
    private formBuilder: FormBuilder,
    private apiRestFulService: ApiRestFulService
  ) {}

  /*
    -> este metodo se encarga de obtener los usuarios, por el momento se implemento como prueba de coneccion
      getUsers(event?: any){
        this.apiRestFulService.getUsers().subscribe({
          next: (res: any) => {
            console.log(res);
          }
        });
      }
*/
  login(event : Event){
    event.preventDefault();
    console.log(`login ${this.email}/ ${this.password}`);
    this.authServiceLogin.login({
      email: this.email,
      password: this.password
    }).subscribe(() => {
      alert("login success");
      this.router.navigate(['/login']);
    }
    );
  } 

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
    this.params.page = 0;
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
