import {ActionIcon, Menu} from '@mantine/core';
import {IconSettings} from '@tabler/icons-react';

export interface HeaderMenuProps {
  children?: React.ReactNode;
}

export function HeaderMenu({children}: HeaderMenuProps) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="subtle">
          <IconSettings />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>{children}</Menu.Dropdown>
    </Menu>
  );
}
