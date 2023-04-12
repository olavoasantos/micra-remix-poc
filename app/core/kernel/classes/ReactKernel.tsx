import {RemixBrowser} from '@remix-run/react';
import {startTransition, StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import {ClientProvider} from '@mantine/remix';
import {ApplicationProvider} from '~/core/app/components/ApplicationProvider';

export class ReactKernel implements Micra.Kernel {
  hydrate(app: Micra.Application) {
    startTransition(() => {
      hydrateRoot(
        document,
        <StrictMode>
          <ApplicationProvider app={app}>
            <ClientProvider>
              <RemixBrowser />
            </ClientProvider>
          </ApplicationProvider>
        </StrictMode>,
      );
    });
  }

  async boot() {
    //
  }

  async run(application: Micra.Application) {
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(() => this.hydrate(application));
    } else {
      setTimeout(this.hydrate, 1);
    }
  }
}
