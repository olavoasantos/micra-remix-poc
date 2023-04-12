import {useReducer} from 'react';
import {useIsomorphicLayoutEffect} from '../useIsomorphicLayoutEffect';
import {useApp} from '../useApp';

export function useEnv<
  K extends keyof Application.EnvironmentVariables,
  T extends Application.EnvironmentVariables[K],
>(name: K, fallback?: T): T {
  const app = useApp();
  const [, forceUpdate] = useReducer((c) => c + 1, 0);

  useIsomorphicLayoutEffect(() => {
    return app.environment.on('set', ({key}) => {
      if (key === name) {
        forceUpdate();
      }
    });
  }, [forceUpdate, name]);

  return env(name, fallback as T) as T;
}
