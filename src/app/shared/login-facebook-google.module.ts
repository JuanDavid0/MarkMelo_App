import { NgModule } from '@angular/core';

//Se importan los módulos necesarios para la configuración de inicio de sesión con Google y Facebook.
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [],
  imports: [SocialLoginModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          //Ingresar las credenciales de los servicios de inicio de sesión con Google y Facebook.
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '915867215653-0et730o4k93as60jssekg33cbpphtc1r.apps.googleusercontent.com' //Cliente de Google ID aquí
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '777497250059829' //Facebook App ID aquí
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [],
})
export class LoginFacebookGoogleModule { }