import {Menu} from '@mantine/core';
import {Form} from '@remix-run/react';

export function Logout() {
  return (
    <Form action="/auth/logout" method="delete">
      <Menu.Item type="submit" style={{width: '100%'}}>
        Logout
      </Menu.Item>
    </Form>
  );
}
