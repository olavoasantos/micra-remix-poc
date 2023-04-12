import {useApp} from '../useApp';

export function useConfiguration() {
  const app = useApp();

  return app.configuration;
}
