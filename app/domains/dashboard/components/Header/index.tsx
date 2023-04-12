import {Group, Header as MantineHeader} from '@mantine/core';
import {Logo} from '../Logo';

export interface HeaderProps {
  LeftSlot?: React.ReactNode;
  RightSlot?: React.ReactNode;
}

export function Header({LeftSlot = null, RightSlot}: HeaderProps) {
  return (
    <MantineHeader height={60}>
      <Group sx={{height: '100%'}} px={20} position="apart">
        <Group align="center">
          {LeftSlot}
          <Logo />
        </Group>
        {RightSlot}
      </Group>
    </MantineHeader>
  );
}
