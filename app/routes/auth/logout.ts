import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from '@remix-run/node';
import {abort} from '~/utilities/abort';

export const loader: LoaderFunction = async function LogoutLoader() {
  return abort(404);
};

export const action: ActionFunction = async function LogoutAction() {
  const auth = use('auth');

  if (auth.check()) {
    auth.logout();
  }

  return redirect('/');
};
