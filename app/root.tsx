import {StylesPlaceholder} from '@mantine/remix';
import {MetaFunction, json} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import {WindowEnv} from '~/core/environment';

export async function loader() {
  const ENV: Application.PublicEnvironmentVariables = {
    APP_NAME: env('APP_NAME'),
    APP_URL: env('APP_URL'),
  };

  return json({ENV});
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: config('app.name'),
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <StylesPlaceholder />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <WindowEnv />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
