import {normalizeError} from '@micra/error';
import {ActionFunction, LoaderFunction, redirect} from '@remix-run/node';
import {AUTH_STRATEGIES} from '~/domains/account/server';
import {abort} from '~/utilities/abort';

export const loader: LoaderFunction = function $ProviderLoader() {
  return abort(404);
};

export const action: ActionFunction = async function $ProviderAction({params}) {
  if (
    !params.provider ||
    !AUTH_STRATEGIES.includes(params.provider as keyof Application.AuthDriver)
  ) {
    return abort(404);
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

    // TODO: flash error
    auth.logout();
    log.error(normalizeError(err).serialize());
    return redirect(authConfig.loginPathname);
  }
};
