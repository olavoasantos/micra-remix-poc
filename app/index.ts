import app from '@micra/application';
import {AppConfigurations, AppServiceProvider} from '~/core/app/server';
import {AuthConfiguration, AuthServiceProvider} from '~/core/auth/server';
import {CacheConfigurations, CacheServiceProvider} from '~/core/cache/server';
import {
  CookieServiceProvider,
  CookiesConfiguration,
} from '~/core/cookie/server';
import {DatabaseServiceProvider} from '~/core/database/server';
import {
  EncryptionConfigurations,
  EncryptionServiceProvider,
} from '~/core/encryption/server';
import {DotenvEnvironment, ProcessEnvironment} from '~/core/environment/server';
// @mapbox/node-pre-gyp (dependency from bcrypt/argon) is causing issues with esbuild (https://github.com/mapbox/node-pre-gyp/issues/661)
// import {HashConfigurations, HashServiceProvider} from '~/core/hashing/server';
import {ExpressKernel, KernelConfig} from '~/core/kernel/server';
import {
  LoggerConfigurations,
  LoggerServiceProvider,
} from '~/core/logger/server';
import {
  SessionConfiguration,
  SessionServiceProvider,
} from '~/core/session/server';
import {UiConfigurations, UiServiceProvider} from '~/core/ui/server';
import {AccountServiceProvider} from '~/domains/account/server';

export default app.run({
  kernel: ExpressKernel,
  environments: [ProcessEnvironment, DotenvEnvironment],
  configurations: {
    app: AppConfigurations,
    auth: AuthConfiguration,
    cache: CacheConfigurations,
    cookies: CookiesConfiguration,
    encryption: EncryptionConfigurations,
    // hash: HashConfigurations,
    kernel: KernelConfig,
    logger: LoggerConfigurations,
    session: SessionConfiguration,
    ui: UiConfigurations,
  },
  providers: {
    LoggerServiceProvider,
    CacheServiceProvider,
    // HashServiceProvider,
    EncryptionServiceProvider,
    DatabaseServiceProvider,
    SessionServiceProvider,
    CookieServiceProvider,
    AuthServiceProvider,
    UiServiceProvider,
    AccountServiceProvider,
    AppServiceProvider,
  },
});
