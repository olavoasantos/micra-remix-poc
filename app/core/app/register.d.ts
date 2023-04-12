declare global {
  namespace Application {
    interface AppConfigurations {
      name: string;
      url: string;
    }

    interface Configurations {
      app: AppConfigurations;
    }

    interface PublicEnvironmentVariables {
      APP_NAME?: string;
      APP_URL?: string;
    }
  }
}

export {};
