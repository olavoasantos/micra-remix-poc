import {Flex} from '@mantine/core';
import {json, redirect, type LoaderFunction} from '@remix-run/node';
import {Login} from '~/domains/account';

export const loader: LoaderFunction = async function LoginLoader() {
  const auth = use('auth');
  const authConfig = config('auth')!;

  if (auth.check()) {
    return redirect(authConfig.successPathname);
  }

  return json({});
};

export default function LoginView() {
  return (
    <Flex
      align="center"
      justify="center"
      style={{height: '100vh', width: '100vw'}}
    >
      <Login />
    </Flex>
  );
}
