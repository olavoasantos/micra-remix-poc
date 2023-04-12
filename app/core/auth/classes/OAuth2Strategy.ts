import {HTTPError, normalizeError} from '@micra/error';
import {AppLoadContext, redirect} from '@remix-run/server-runtime';
import {generateId} from '../utilities/generateId';
import {Strategy} from './Strategy';
export interface OAuth2Profile {
  provider: string;
  id?: string;
  displayName?: string;
  name?: {
    familyName?: string;
    givenName?: string;
    middleName?: string;
  };
  emails?: Array<{
    value: string;
    type?: string;
  }>;
  photos?: Array<{value: string}>;
}

type ResponseType =
  | 'id_token'
  | 'token'
  | 'id_token token'
  | 'code'
  | 'code id_token'
  | 'code id_token token';

export interface OAuth2StrategyOptions {
  authorizationURL: string;
  tokenURL: string;
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  responseType?: ResponseType;
  useBasicAuthenticationHeader?: boolean;
}

export interface OAuth2StrategyVerifyParams<
  Profile extends OAuth2Profile,
  ExtraParams extends Record<string, unknown> = Record<string, never>,
> {
  accessToken: string;
  refreshToken: string;
  extraParams: ExtraParams;
  profile: Profile;
  context?: AppLoadContext;
}

export class OAuth2Strategy<
  Profile extends OAuth2Profile,
  ExtraParams extends Record<string, unknown> = Record<string, never>,
> extends Strategy<OAuth2StrategyVerifyParams<Profile, ExtraParams>> {
  name = 'oauth2';

  protected authorizationURL: string;
  protected tokenURL: string;
  protected clientID: string;
  protected clientSecret: string;
  protected callbackURL: string;
  protected responseType: ResponseType;
  protected useBasicAuthenticationHeader: boolean;

  private sessionStateKey = 'oauth2:state';

  constructor(options: OAuth2StrategyOptions) {
    super();
    this.authorizationURL = options.authorizationURL;
    this.tokenURL = options.tokenURL;
    this.clientID = options.clientID;
    this.clientSecret = options.clientSecret;
    this.callbackURL = options.callbackURL;
    this.responseType = options.responseType ?? 'code';
    this.useBasicAuthenticationHeader =
      options.useBasicAuthenticationHeader ?? false;
  }

  async authenticate(
    request: Request,
    session: Micra.Session,
  ): Promise<Application.Session[Application.AuthSessionKey]> {
    const url = new URL(request.url);
    const callbackURL = this.getCallbackURL(url);

    // Redirect the user to the callback URL
    if (url.pathname !== callbackURL.pathname) {
      const state = this.generateState();
      session.flash(this.sessionStateKey, state);
      throw redirect(this.getAuthorizationURL(request, state).toString());
    }

    // Validations of the callback URL params
    const stateUrl = url.searchParams.get('state');
    if (!stateUrl) {
      throw new HTTPError(401, 'Missing state on URL');
    }

    if (session.missing(this.sessionStateKey)) {
      throw new HTTPError(401, 'Missing state on session');
    }

    if (session.get(this.sessionStateKey) !== stateUrl) {
      throw new HTTPError(401, "State doesn't match");
    }

    const code = url.searchParams.get('code');
    if (!code) {
      throw new HTTPError(401, 'Missing code');
    }

    try {
      // Get the access token
      const params = new URLSearchParams(this.tokenParams());
      params.set('grant_type', 'authorization_code');
      params.set('redirect_uri', callbackURL.toString());

      const {accessToken, refreshToken, extraParams} =
        await this.fetchAccessToken(code, params);

      // Get the profile
      const profile = await this.userProfile(accessToken, extraParams);

      // Verify the user and return it, or redirect
      return await this.verify({
        accessToken,
        refreshToken,
        extraParams,
        profile,
      });
    } catch (error) {
      if (typeof error === 'string') {
        throw new HTTPError(401, error);
      }
      throw normalizeError(error);
    }
  }

  /**
   * Retrieve user profile from service provider.
   *
   * OAuth 2.0-based authentication strategies can override this function in
   * order to load the user's profile from the service provider.  This assists
   * applications (and users of those applications) in the initial registration
   * process by automatically submitting required information.
   */
  protected async userProfile(
    _accessToken: string,
    _params: ExtraParams,
  ): Promise<Profile> {
    return {provider: 'oauth2'} as Profile;
  }

  /**
   * Return extra parameters to be included in the authorization request.
   *
   * Some OAuth 2.0 providers allow additional, non-standard parameters to be
   * included when requesting authorization.  Since these parameters are not
   * standardized by the OAuth 2.0 specification, OAuth 2.0-based authentication
   * strategies can override this function in order to populate these
   * parameters as required by the provider.
   */
  protected authorizationParams(params: URLSearchParams): URLSearchParams {
    return new URLSearchParams(params);
  }

  /**
   * Return extra parameters to be included in the token request.
   *
   * Some OAuth 2.0 providers allow additional, non-standard parameters to be
   * included when requesting an access token.  Since these parameters are not
   * standardized by the OAuth 2.0 specification, OAuth 2.0-based authentication
   * strategies can override this function in order to populate these
   * parameters as required by the provider.
   */
  protected tokenParams(): URLSearchParams {
    return new URLSearchParams();
  }

  protected async getAccessToken(response: Response): Promise<{
    accessToken: string;
    refreshToken: string;
    extraParams: ExtraParams;
  }> {
    const {access_token, refresh_token, ...extraParams} = await response.json();
    return {
      accessToken: access_token as string,
      refreshToken: refresh_token as string,
      extraParams,
    } as const;
  }

  private getCallbackURL(url: URL) {
    if (
      this.callbackURL.startsWith('http:') ||
      this.callbackURL.startsWith('https:')
    ) {
      return new URL(this.callbackURL);
    }
    if (this.callbackURL.startsWith('/')) {
      return new URL(this.callbackURL, url);
    }
    return new URL(`${url.protocol}//${this.callbackURL}`);
  }

  private getAuthorizationURL(request: Request, state: string) {
    const params = new URLSearchParams(
      this.authorizationParams(new URL(request.url).searchParams),
    );
    params.set('response_type', this.responseType);
    params.set('client_id', this.clientID);
    params.set(
      'redirect_uri',
      this.getCallbackURL(new URL(request.url)).toString(),
    );
    params.set('state', state);

    const url = new URL(this.authorizationURL);
    url.search = params.toString();

    return url;
  }

  private generateState() {
    return generateId('oauth2');
  }

  /**
   * Format the data to be sent in the request body to the token endpoint.
   */
  private async fetchAccessToken(
    code: string,
    params: URLSearchParams,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    extraParams: ExtraParams;
  }> {
    let headers: HeadersInit = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (this.useBasicAuthenticationHeader) {
      const b64EncodedCredentials = Buffer.from(
        `${this.clientID}:${this.clientSecret}`,
      ).toString('base64');

      headers = {
        ...headers,
        Authorization: `Basic ${b64EncodedCredentials}`,
      };
    } else {
      params.set('client_id', this.clientID);
      params.set('client_secret', this.clientSecret);
    }

    if (params.get('grant_type') === 'refresh_token') {
      params.set('refresh_token', code);
    } else {
      params.set('code', code);
    }

    const response = await fetch(this.tokenURL, {
      method: 'POST',
      headers,
      body: params,
    });

    if (!response.ok) {
      const body = await response.text();
      throw body;
    }

    return await this.getAccessToken(response.clone() as unknown as Response);
  }
}
