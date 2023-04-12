import app from '@micra/application';
import {AppConfigurations, AppServiceProvider} from '~/core/app/client';
import {
  CookieServiceProvider,
  CookiesConfiguration,
} from '~/core/cookie/client';
import {WindowEnvironment} from '~/core/environment/client';
import {ReactKernel} from '~/core/kernel/client';
import {UiConfigurations, UiServiceProvider} from '~/core/ui/client';

export default app.run({
  kernel: ReactKernel,
  environments: [WindowEnvironment],
  configurations: {
    app: AppConfigurations,
    cookies: CookiesConfiguration,
    ui: UiConfigurations,
  },
  providers: {
    CookieServiceProvider,
    UiServiceProvider,
    AppServiceProvider,
  },
});
