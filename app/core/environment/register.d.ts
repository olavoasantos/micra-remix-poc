declare global {
  namespace Application {
    interface PublicEnvironmentVariables {}

    interface EnvironmentVariables extends PublicEnvironmentVariables {}
  }

  namespace NodeJS {
    interface ProcessEnv extends Application.EnvironmentVariables {}
  }
}

export {};
