import {normalizeError} from '@micra/error';
import {LoaderFunction, redirect} from '@remix-run/node';
import {AUTH_STRATEGIES} from '~/domains/account/server';
import {abort} from '~/utilities/abort';

export const loader: LoaderFunction = async function $ProviderCallbackLoader({
  params,
}) {
  if (
    !params.provider ||
    !AUTH_STRATEGIES.includes(params.provider as keyof Application.AuthDriver)
  ) {
    throw abort(404);
  }

  const log = use('log');
  const auth = use('auth');
  const authConfig = config('auth')!;

  if (auth.check()) {
    return redirect(authConfig.successPathname);
  }

  try {
    await auth.authenticate(params.provider);
    return redirect(authConfig.successPathname);
  } catch (err) {
    if (err instanceof Response) {
      return err;
    }

    auth.logout();
    log.error(normalizeError(err).serialize());
    return redirect(authConfig.loginPathname);
  }
};
