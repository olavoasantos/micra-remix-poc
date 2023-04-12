import type {Strategy} from './Strategy';
import {HTTPError} from '@micra/error';

export class AuthenticationHandler implements Micra.AuthenticationHandler {
  constructor(
    private strategies: Map<string, Strategy<any>>,
    private request: Request,
    public session: Micra.Session,
    public key: string,
  ) {}

  async authenticate(
    name: string,
  ): Promise<Application.Session[Application.AuthSessionKey]> {
    const strategy = this.strategies.get(name);
    if (!strategy) throw new HTTPError(500, `Strategy ${name} not found.`);
    if (!this.session) throw new HTTPError(401, `No session available`);

    let data = this.session.get(this.key);
    if (!data) {
      data = await strategy.authenticate(
        new Request(this.request.url, this.request),
        this.session,
      );
      this.session.set(this.key, data);
    }

    return data;
  }

  check(): boolean {
    return !this.session.isEmpty && this.session.exists(this.key);
  }

  logout(): void {
    this.session.delete(this.key);
  }
}
