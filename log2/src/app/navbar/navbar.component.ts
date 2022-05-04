import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
// import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name: string = "";

  constructor(private oauthService: OAuthService) { }

  @Output() someEvent = new EventEmitter<any>();

  givenName:any;

  ngOnInit(): void {
    const userClaims: any = this.oauthService.getIdentityClaims();
    console.log(userClaims);
    if(userClaims){
      this.givenName = userClaims.name ? userClaims.name : "";
    }
  }

  login() {
      this.someEvent.next('somePhone');
  }

  logout() {
    this.oauthService.logOut();
  }
}
