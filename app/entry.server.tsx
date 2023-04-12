import {createStylesServer, injectStyles} from '@mantine/remix';
import app from '@micra/application';
import type {EntryContext} from '@remix-run/node';
import {RemixServer} from '@remix-run/react';
import {renderToString} from 'react-dom/server';
import {ApplicationProvider} from '~/core/app/server';

const stylesServer = createStylesServer();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const markup = renderToString(
    // Workaround to get the app instance into the context. Remix makes this difficult as we can't
    // handle this part of the request within the Kernel.
    <ApplicationProvider app={app}>
      <RemixServer context={remixContext} url={request.url} />
    </ApplicationProvider>,
  );
  responseHeaders.set('Content-Type', 'text/html');

  return new Response(`<!DOCTYPE html>${injectStyles(markup, stylesServer)}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
