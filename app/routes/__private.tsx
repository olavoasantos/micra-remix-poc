import {
  AppShell,
  Burger,
  MediaQuery,
  Menu,
  useMantineTheme,
  MantineProvider,
} from '@mantine/core';
import {json, redirect, type LoaderFunction} from '@remix-run/node';
import {Outlet} from '@remix-run/react';
import {IconHome} from '@tabler/icons-react';
import {useState} from 'react';
import {useConfig} from '~/core/app';
import {ThemeToggler} from '~/core/ui';
import {Logout} from '~/domains/account';
import {Header, HeaderMenu, Navbar, NavbarLink} from '~/domains/dashboard';

export const loader: LoaderFunction = async function PrivateLoader() {
  const auth = use('auth');
  const authConfig = config('auth')!;

  return auth.check() ? json({}) : redirect(authConfig.loginPathname);
};

export default function PrivateView() {
  const theme = useMantineTheme();
  const uiConfig = useConfig('ui');
  const [hidden, setHidden] = useState(true);

  return (
    <MantineProvider theme={uiConfig.theme} withGlobalStyles withNormalizeCSS>
      <AppShell
        navbarOffsetBreakpoint="sm"
        padding="md"
        navbar={
          <Navbar hidden={hidden}>
            <NavbarLink to="/admin" icon={<IconHome size={18} />} color="blue">
              Home
            </NavbarLink>
          </Navbar>
        }
        header={
          <Header
            LeftSlot={
              <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                <Burger
                  opened={!hidden}
                  onClick={() => setHidden((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                />
              </MediaQuery>
            }
            RightSlot={
              <HeaderMenu>
                <ThemeToggler />
                <Menu.Divider />
                <Logout />
              </HeaderMenu>
            }
          />
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Outlet />
      </AppShell>
    </MantineProvider>
  );
}
