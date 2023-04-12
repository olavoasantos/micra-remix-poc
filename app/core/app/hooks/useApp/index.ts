import {useContext} from 'react';
import {ApplicationContext} from '../../context/ApplicationContext';
import {HTTPError} from '@micra/error';

export function useApp(): Micra.Application {
  const app = useContext(ApplicationContext);

  if (!app) {
    throw new HTTPError(500, 'No application context found.');
  }

  return app;
}
