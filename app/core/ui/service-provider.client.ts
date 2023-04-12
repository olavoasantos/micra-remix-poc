import {createEmotionCache} from '@mantine/core';
import {ThemeManager} from './classes/ThemeManager';

export const UiServiceProvider: Micra.ServiceProvider = {
  register({container, configuration}) {
    container.factory('theme', () => new ThemeManager(configuration));
  },
  boot() {
    createEmotionCache({key: 'mantine'});
  },
};
