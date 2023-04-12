import {useReducer} from 'react';
import {useIsomorphicLayoutEffect} from '../useIsomorphicLayoutEffect';
import type {PathValue, PathsOf} from '@micra/core/utilities/DotNotation';
import {useApp} from '../useApp';

export function useConfig<
  Path extends PathsOf<Application.Configurations>,
  Value extends PathValue<Application.Configurations, Path>,
>(name: Path, fallback?: Value): Value {
  const app = useApp();
  const [, forceUpdate] = useReducer((c) => c + 1, 0);

  useIsomorphicLayoutEffect(() => {
    return app.configuration.on('set', ({path}) => {
      if (path.startsWith(name)) {
        forceUpdate();
      }
    });
  }, [forceUpdate, name]);

  return config(name, fallback) as Value;
}
