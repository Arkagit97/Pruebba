import { Component, ViewChild } from '@angular/core';
import { OAuthService, NullValidationHandler } from 'angular-oauth2-oidc';
import { filter } from 'rxjs';
// import { LoginService } from './login.service.tswsrtg';
import { authCodeFlowConfig } from './sso-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'registroSyndeno';
  name: string = "";
  private _decodedAccessToken: any;
  private _decodedIDToken: any;
  get decodedAccessToken() { return this._decodedAccessToken; }
  get decodedIDToken() { return this._decodedIDToken; }

  @ViewChild('yourChild' /* #name or Type*/, {static: false}) child: any;

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit() {
    //this.initAuth();
  }

  async initAuth(): Promise<any> {
    return new Promise<void>((resolveFn, rejectFn) => {
      // setup oauthService
      this.oauthService.configure(authCodeFlowConfig);
      this.oauthService.setStorage(localStorage);
      this.oauthService.tokenValidationHandler = new NullValidationHandler();

      // subscribe to token events
      this.oauthService.events.pipe(filter((e: any) => {
        console.log("e : ", e);
        return e.type === 'token_received';
      })).subscribe(() => {
        console.log("here..");
        this.handleNewToken();
      });

      this.oauthService.loadDiscoveryDocumentAndLogin().then(isLoggedIn => {
        console.log("isLoggedIn: ", isLoggedIn);
        if (isLoggedIn) {
          this.oauthService.setupAutomaticSilentRefresh();
          resolveFn();
        } else {
          this.oauthService.initImplicitFlow();
          rejectFn();
        }
      });

    });
  }

  private handleNewToken() {
    this._decodedAccessToken = this.oauthService.getAccessToken();
    this._decodedIDToken = this.oauthService.getIdToken();
  }

}
