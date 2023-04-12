import type {Static} from '@micra/core/utilities/Static';
import type {
  GoogleExtraParams,
  GoogleProfile,
  GoogleStrategyOptions,
} from './classes/GoogleStrategy';

declare global {
  namespace Application {
    type AuthSessionKey = 'user';

    type DriverDefinition<Class, Options> = {
      driver: Static<Class, [options: Options]>;
      options: Options;
    };

    interface AuthDriver {
      google: DriverDefinition<Strategy, GoogleStrategyOptions>;
    }

    interface AuthVerifyParams {
      google: OAuth2StrategyVerifyParams<GoogleProfile, GoogleExtraParams>;
    }

    interface AuthConfiguration {
      key: Application.AuthSessionKey;
      loginPathname: string;
      successPathname: string;
      drivers: AuthDriver;
    }

    interface Services {
      Authenticator: Micra.Authenticator;
      auth: Micra.AuthenticationHandler;
    }

    interface Configurations {
      auth: AuthConfiguration;
    }

    interface EnvironmentVariables {
      AUTH_LOGIN_ROUTE?: string;
      AUTH_LOGIN_SUCCESS_ROUTE?: string;
      AUTH_GOOGLE_HOST: string;
      AUTH_GOOGLE_CLIENT_ID: string;
      AUTH_GOOGLE_CLIENT_SECRET: string;
      AUTH_GOOGLE_SCOPE?: string;
      AUTH_GOOGLE_ACCESS_TYPE?: 'online' | 'offline';
      AUTH_GOOGLE_PROMPT?: 'none' | 'consent' | 'select_account';
    }
  }

  namespace Micra {
    interface AuthVerifyCallback<VerifyParams> {
      (params: VerifyParams): Promise<
        Application.Session[Application.AuthSessionKey]
      >;
    }

    interface AuthStrategy<VerifyOptions> {
      name: string;
      authenticate(
        request: Request,
        session: Micra.Session,
      ): Promise<Application.Session[Application.AuthSessionKey]>;
      setVerifier(verify: AuthVerifyCallback<VerifyOptions>): void;
    }

    interface Authenticator {
      use(strategy: AuthStrategy<any>): this;
      unuse(name: string): this;
      verify<Strategy extends keyof Application.AuthVerifyParams>(
        strategy: Strategy,
        verify: AuthVerifyCallback<Application.AuthVerifyParams[Strategy]>,
      ): void;
      createHandler(
        request: Request,
        session: Micra.Session,
      ): Micra.AuthenticationHandler;
    }

    interface AuthenticationHandler {
      readonly session: Session;
      authenticate(
        name: string,
      ): Promise<Application.Session[Application.AuthSessionKey]>;
      check(): boolean;
      logout(): void;
    }
  }
}

export {};
