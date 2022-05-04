import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogginComponent } from './loggin/loggin.component';
import { NavbarComponent } from './navbar/navbar.component';
import {OAuthModule, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import { HttpClientModule, HttpClient } from '@angular/common/http';




// function initializer(keycloak: KeycloakService) {
//   return () =>
//     keycloak.init({
//       config: {
//         url: 'http://localhost:8080/auth',
//         realm: 'Syndeno',
//         clientId: 'jftorres'
//       },
//       initOptions: {
//         onLoad: 'check-sso',
//         silentCheckSsoRedirectUri:
//           window.location.origin + '/assets/silent-check-sso.html'
//       }
//     });
// }

@NgModule({
  declarations: [
    AppComponent,
    LogginComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['http://localhost:8080'],
          sendAccessToken: true
      }
  })
  ],
  providers: [
    OAuthService,
    UrlHelperService,
    OAuthService,
    {provide: ErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
