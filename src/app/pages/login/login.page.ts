import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ApiRestFullService } from 'src/app/services/api-rest-full.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { SocialAuthService, SocialUser, GoogleSigninButtonModule, FacebookLoginProvider, } from '@abacritt/angularx-social-login';
import { LoginFacebookGoogleModule } from 'src/app/shared/login-facebook-google/login-facebook-google.module';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule, LoginFacebookGoogleModule, GoogleSigninButtonModule],
})
export class LoginPage implements OnInit {

  characters: any[] = [];
  params = {} as any;

  loginForm!: FormGroup;
  socialUser!: any;
  isLoggedin: any;

  constructor(
    private apiRestFull: ApiRestFullService,
    private authService: SocialAuthService,
    private formBuilder: FormBuilder,
  ) { }

    getUserLogin() {
    this.apiRestFull.getUserApi()
      .subscribe(
        (data) => { console.log(this.params = data); },
        (error) => { console.log(error); }
      )

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
    });
    this.params.page = 0;
    this.getUserLogin();
  }

  signInWithFB(): void {
    /*if (window.location.protocol !== 'https:') {
      console.error('Facebook login requires HTTPS. Please switch to HTTPS and retry.');
      return;
    }*/
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {
      this.authService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = user != null;
        alert('Facebook login success');
        console.log('Facebook login success:', user);
      });
    }).catch((error) => {
      alert('Facebook login failed');
      console.error('Facebook login failed:', error);
    });
  }

  signOut(): void {
    from(this.authService.signOut()).subscribe(() => {
      alert('User signed out');
      console.log('User signed out');
      this.isLoggedin = false;
    }, (error) => {
      alert('User sign out failed');
      console.error('User sign out failed:', error);
    });
  }
}
