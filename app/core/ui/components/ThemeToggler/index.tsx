import {Menu} from '@mantine/core';
import {useService} from '~/core/app';

export function ThemeToggler() {
  const themeManager = useService('theme');

  return (
    <Menu.Item onClick={() => themeManager.toggleTheme()}>
      Use {themeManager.isDark ? 'light' : 'dark'} mode
    </Menu.Item>
  );
}
