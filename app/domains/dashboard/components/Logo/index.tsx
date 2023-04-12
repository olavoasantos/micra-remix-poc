import {Avatar} from '@mantine/core';
import {useConfig} from '~/core/app';

export function Logo() {
  const name = useConfig('app.name', 'Micra');

  return (
    <Avatar color="indigo" alt={name} radius="xl">
      {name.charAt(0).toUpperCase()}
    </Avatar>
  );
}
