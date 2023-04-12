import type {NodeOptions} from '@sentry/node';
declare global {
  namespace Application {
    interface LoggerTransports {
      sentry?: {
        sentry: NodeOptions;
        minLevel?: number;
        withLogRecord?: boolean;
        tags?: string[];
        context?: string[];
        skipSentryInit?: boolean;
      };
    }

    interface LoggerConfigurations {
      /**
       * Avoid error causes by circular references in the object tree. Default: `true`.
       */
      safe?: boolean;
      /**
       * The name of the logger. Default: `undefined`.
       */
      name?: string;
      /**
       * Enables or disables the inclusion of a timestamp in the log message. If a function is supplied, it must
       * synchronously return a JSON string representation of the time. If set to `false`, no timestamp will be included in the output.
       */
      timestamp?: boolean;
      /**
       * One of the supported levels or `silent` to disable logging. Any other value defines a custom level and
       * requires supplying a level value via `levelVal`. Default: 'info'.
       */
      level?: Micra.LogLevel;
      /**
       * As an array, the redact option specifies paths that should have their values redacted from any log output.
       *
       * Each path must be a string using a syntax which corresponds to JavaScript dot and bracket notation.
       */
      redact?: string[];
      /**
       * Enables logging. Default: `true`.
       */
      enabled?: boolean;
      /**
       * A string that would be prefixed to every message (and child message)
       */
      msgPrefix?: string;
      /**
       * Stringification limit at a specific nesting depth when logging circular object. Default: `5`.
       */
      depthLimit?: number;
      /**
       * Stringification limit of properties/elements when logging a specific object/array with circular references. Default: `100`.
       */
      edgeLimit?: number;

      transports: LoggerTransports;
    }

    interface Services {
      log: Micra.Logger;
    }

    interface Configurations {
      logger: LoggerConfigurations;
    }

    interface EnvironmentVariables {
      LOG_ENABLED: string;
      LOG_LEVEL: Micra.LogLevel;
      LOG_SENTRY_DSN: string;
    }
  }

  namespace Micra {
    type LogLevel =
      | 'fatal'
      | 'error'
      | 'warn'
      | 'info'
      | 'debug'
      | 'trace'
      | 'silent';

    interface TransportTargetOptions<TransportOptions = Record<string, any>> {
      target: string;
      options?: TransportOptions;
      level?: LogLevel;
    }

    type LogTransport<TransportOptions = Record<string, any>> =
      | TransportSingleOptions<TransportOptions>
      | TransportPipelineOptions<TransportOptions>
      | TransportMultiOptions<TransportOptions>;

    interface ChildLoggerOptions {
      name?: string;
      bindings?: Record<string, any>;
      level?: LogLevel;
      redact?: string[];
    }

    interface Logger {
      /**
       * Set this property to the desired logging level. In order of priority, available levels are:
       *
       * - 'fatal'
       * - 'error'
       * - 'warn'
       * - 'info'
       * - 'debug'
       * - 'trace'
       * - 'silent'
       *
       * The logging level is a __minimum__ level. For instance if `logger.level` is `'info'` then all `'fatal'`, `'error'`, `'warn'`,
       * and `'info'` logs will be enabled.
       */
      level: LogLevel;
      /**
       * Log at `'fatal'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
       * If more args follows `msg`, these will be used to format `msg` using `util.format`.
       */
      fatal(msg: any, ...args: any[]): void;
      /**
       * Log at `'error'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
       * If more args follows `msg`, these will be used to format `msg` using `util.format`.
       */
      error(msg: any, ...args: any[]): void;
      /**
       * Log at `'warn'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
       * If more args follows `msg`, these will be used to format `msg` using `util.format`.
       */
      warn(msg: any, ...args: any[]): void;
      /**
       * Log at `'info'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
       * If more args follows `msg`, these will be used to format `msg` using `util.format`.
       */
      info(msg: any, ...args: any[]): void;
      /**
       * Log at `'debug'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
       * If more args follows `msg`, these will be used to format `msg` using `util.format`.
       */
      debug(msg: any, ...args: any[]): void;
      /**
       * Log at `'trace'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
       * If more args follows `msg`, these will be used to format `msg` using `util.format`.
       */
      trace(msg: any, ...args: any[]): void;

      child(options: ChildLoggerOptions): Logger;

      use<TransportOptions = Record<string, any>>(
        name: string,
        options: TransportTargetOptions<TransportOptions>,
      ): this;
    }
  }
}

export {};
