import type {MantineThemeOverride} from '@mantine/core';

declare global {
  namespace Application {
    interface ThemeManager {
      colorScheme: 'light' | 'dark';
      isLight: boolean;
      isDark: boolean;
      toggleTheme(): void;
    }

    interface UiConfigurations {
      theme: MantineThemeOverride;
    }

    interface Services {
      theme: ThemeManager;
    }

    interface Configurations {
      ui: UiConfigurations;
    }

    interface PublicEnvironmentVariables {}
  }
}

export {};
