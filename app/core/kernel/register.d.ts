declare global {
  namespace Application {
    interface Services {
      request: Request;
      response: Response;
    }

    interface Configurations {
      kernel: {
        port: number;
        stage: 'production' | 'development' | 'test';
      };
    }

    interface EnvironmentVariables {
      PORT: string;
      NODE_ENV: 'production' | 'development' | 'test';
    }
  }

  namespace Micra {
    interface ServiceProvider {
      registerRequest?(application: Application): void | Promise<void>;
      bootRequest?(application: Application): void | Promise<void>;
      completeRequest?(application: Application): void | Promise<void>;
    }
  }
}

export {};
