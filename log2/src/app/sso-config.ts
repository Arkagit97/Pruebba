import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authCodeFlowConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: environment.keycloak.issuer,

    redirectUri: environment.keycloak.redirectUri,

    clientId: environment.keycloak.clientId,

    // dummyClientSecret: 'secret',

    responseType: 'code',

    scope: environment.keycloak.scope,

    requireHttps: false,

    showDebugInformation: true,

    disableAtHashCheck: true,

    strictDiscoveryDocumentValidation: false
};

export class OAuthModuleConfig {
    resourceServer: OAuthResourceServerConfig = {sendAccessToken: false};
}

export class OAuthResourceServerConfig {

    allowedUrls?: Array<string>;
    sendAccessToken = true;
    customUrlValidation?: (url: string) => boolean;
}
