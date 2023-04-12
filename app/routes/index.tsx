import {json} from '@remix-run/node';
import {Title} from '@mantine/core';
import {Login} from '~/domains/account';

export const loader = async function HomeLoader() {
  const auth = use('auth');

  if (auth.check()) {
    return json({
      user: {
        email: auth.session.data.user.email,
        name: auth.session.data.user.name,
      },
    });
  }

  return json({});
};

export default function Index() {
  return (
    <>
      <Title>Home</Title>
      <Login />
    </>
  );
}
