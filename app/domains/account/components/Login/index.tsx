import {ActionIcon} from '@mantine/core';
import {Form} from '@remix-run/react';

export function Login() {
  return (
    <Form action="/auth/google" method="post">
      <ActionIcon type="submit">login</ActionIcon>
    </Form>
  );
}
