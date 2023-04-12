export class LoggerConfigurations implements Application.LoggerConfigurations {
  enabled = env('LOG_ENABLED', 'true') === 'true';

  level?: Micra.LogLevel = env('LOG_LEVEL', 'info');

  redact = [];

  transports: Application.LoggerConfigurations['transports'] = {
    sentry: {
      sentry: {
        dsn: env('LOG_SENTRY_DSN', 'Missing Sentry DSN'),
      },
    },
  };
}
