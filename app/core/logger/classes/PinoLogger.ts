import pino, {type Logger, type TransportTargetOptions} from 'pino';

export class PinoLogger implements Micra.Logger {
  #pino: Logger;
  #transports: TransportTargetOptions[] = [];

  get level(): Micra.LogLevel {
    return this.#pino.level as Micra.LogLevel;
  }

  constructor(
    private options: Application.LoggerConfigurations,
    logger?: Logger,
  ) {
    this.#pino = logger ?? pino(options);
  }

  fatal(msg: any, ...args: any[]): void {
    if (typeof msg === 'string') {
      return this.#pino.fatal(msg, ...args);
    }

    this.#pino.fatal(JSON.stringify(msg), ...args);
  }

  error(msg: any, ...args: any[]): void {
    if (typeof msg === 'string') {
      return this.#pino.error(msg, ...args);
    }

    this.#pino.error(JSON.stringify(msg), ...args);
  }

  warn(msg: any, ...args: any[]): void {
    if (typeof msg === 'string') {
      return this.#pino.warn(msg, ...args);
    }

    this.#pino.warn(JSON.stringify(msg), ...args);
  }

  info(msg: any, ...args: any[]): void {
    if (typeof msg === 'string') {
      return this.#pino.info(msg, ...args);
    }

    this.#pino.info(JSON.stringify(msg), ...args);
  }

  debug(msg: any, ...args: any[]): void {
    if (typeof msg === 'string') {
      return this.#pino.debug(msg, ...args);
    }

    this.#pino.debug(JSON.stringify(msg), ...args);
  }

  trace(msg: any, ...args: any[]): void {
    if (typeof msg === 'string') {
      return this.#pino.trace(msg, ...args);
    }

    this.#pino.trace(JSON.stringify(msg), ...args);
  }

  child(options: Micra.ChildLoggerOptions): Micra.Logger {
    return new PinoLogger(this.options, this.#pino.child(options));
  }

  use<TransportOptions = Record<string, any>>(
    name: keyof Application.LoggerTransports,
    target: Micra.TransportTargetOptions<TransportOptions>,
  ): this {
    const baseOptions = Object.assign(
      {},
      this.options.transports[name] ?? {},
      target.options ?? {},
    );

    this.#transports.push({...target, options: baseOptions});

    this.#pino = pino({
      ...this.options,
      transport: {
        targets: this.#transports.slice(),
      },
    });

    return this;
  }
}
