import {createEmotionCache} from '@mantine/core';
import {ThemeManager} from './classes/ThemeManager';

export const UiServiceProvider: Micra.ServiceProvider = {
  registerRequest({container, configuration}) {
    container.factory('theme', () => new ThemeManager(configuration));
  },
  bootRequest() {
    createEmotionCache({key: 'mantine'});
  },
};
