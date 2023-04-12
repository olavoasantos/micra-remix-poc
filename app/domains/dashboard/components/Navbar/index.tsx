import {Navbar as MantineNavbar} from '@mantine/core';
import {NavigateToWebsite} from '../NavigateToWebsite';

export interface NavbarProps {
  hidden?: boolean;
  children?: React.ReactNode;
}

export function Navbar({hidden, children}: NavbarProps) {
  return (
    <MantineNavbar
      p="xs"
      hiddenBreakpoint="sm"
      hidden={hidden}
      width={{sm: 200, lg: 300}}
    >
      <MantineNavbar.Section grow mt="xs">
        {children}
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <NavigateToWebsite />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}
