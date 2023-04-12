import {useReducer} from 'react';
import {useIsomorphicLayoutEffect} from '../useIsomorphicLayoutEffect';
import {useApp} from '../useApp';

export function useService<
  K extends keyof Application.Services,
  T extends Application.Services[K],
>(name: K): T {
  const app = useApp();
  const [, forceUpdate] = useReducer((c) => c + 1, 0);

  useIsomorphicLayoutEffect(() => {
    return app.container.on('set', ({namespace}) => {
      if (namespace === name) {
        forceUpdate();
      }
    });
  }, [forceUpdate, name]);

  return use(name) as T;
}
