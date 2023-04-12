import '@remix-run/express';
import * as build from '@remix-build';
import {createNamespace} from 'cls-hooked';
import {
  createRequestHandler,
  type Response as NodeResponse,
} from '@remix-run/node';
import compression from 'compression';
import express from 'express';
import type {Server} from 'http';
import {purgeRequireCache} from '../utilities/purgeRequiredCache';
import {
  createRemixRequest,
  sendRemixResponse,
} from '@remix-run/express/dist/server';

export class ExpressKernel implements Micra.Kernel<Server> {
  #app = express();
  #requestScope = createNamespace('request');

  async boot(application: Micra.Application): Promise<void> {
    if ((global as any).use) {
      (global as any).use = <K extends keyof Application.Services>(
        namespace: K,
      ): Application.Services[K] =>
        this.#requestScope.active
          ? this.#requestScope.get('use')(namespace)
          : application.container.use(namespace);
    }

    this.#app.use(compression());

    this.#app.disable('x-powered-by');

    this.#app.use(
      '/build',
      express.static('public/build', {immutable: true, maxAge: '1y'}),
    );

    this.#app.use(express.static('public', {maxAge: '1h'}));

    this.#app.use((req, res, next) => {
      next();
      if (res.statusCode < 400) {
        application.container
          .use('log')
          .info(`${req.method} ${req.url} ${res.statusCode}`);
      } else if (res.statusCode < 500) {
        application.container
          .use('log')
          .warn(`${req.method} ${req.url} ${res.statusCode}`);
      } else {
        application.container
          .use('log')
          .error(`${req.method} ${req.url} ${res.statusCode}`);
      }
    });

    const handleRequest = createRequestHandler(build, config('kernel.stage'));
    this.#app.all('*', (req, res, next) => {
      if (config('kernel.stage') === 'development') {
        purgeRequireCache();
      }

      return this.#requestScope.runPromise(async () => {
        try {
          const requestApplication = application.createScope('request', {
            provider: ['registerRequest', 'bootRequest'],
            terminate: ['completeRequest'],
          });
          this.#requestScope.set(
            'use',
            (namespace: keyof Application.Services) => {
              try {
                return requestApplication.container.use(namespace);
              } catch (e) {
                return application.container.use(namespace);
              }
            },
          );

          const request = createRemixRequest(req, res);
          requestApplication.container.value('request', request);
          await requestApplication.run();
          const response = (await handleRequest(request, {
            application,
          })) as NodeResponse;

          requestApplication.container.value('response', response);

          await requestApplication.terminate();

          await sendRemixResponse(res, response);
        } catch (err) {
          next(err);
        }
      });
    });
  }

  async run() {
    const port = config('kernel.port');

    return this.#app.listen(port, () =>
      console.log(`http://localhost:${port}`),
    );
  }
}
