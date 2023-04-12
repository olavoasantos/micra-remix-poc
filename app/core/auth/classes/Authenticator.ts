import type {Strategy} from './Strategy';
import {AuthenticationHandler} from './AuthenticationHandler';

export class Authenticator implements Micra.Authenticator {
  private strategies;
  public readonly key: NonNullable<Application.AuthSessionKey>;

  constructor(private options: Application.AuthConfiguration) {
    this.key = this.options.key;
    this.strategies = new Map<string, Strategy<any>>();
    Object.entries(this.options.drivers).forEach(([name, {driver, options}]) =>
      this.strategies.set(name, new driver(options)),
    );
  }

  use(strategy: Strategy<any>): this {
    this.strategies.set(strategy.name, strategy);
    return this;
  }

  unuse(name: string): this {
    this.strategies.delete(name);
    return this;
  }

  verify<Strategy extends keyof Application.AuthVerifyParams>(
    strategy: Strategy,
    verify: Micra.AuthVerifyCallback<Application.AuthVerifyParams[Strategy]>,
  ) {
    this.strategies.get(strategy)?.setVerifier(verify);
  }

  createHandler(
    request: Request,
    session: Micra.Session,
  ): Micra.AuthenticationHandler {
    return new AuthenticationHandler(
      this.strategies,
      request,
      session,
      this.options.key,
    );
  }
}
