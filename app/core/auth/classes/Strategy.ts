import {HTTPError} from '@micra/error';

export abstract class Strategy<VerifyOptions>
  implements Micra.AuthStrategy<VerifyOptions>
{
  public abstract name: string;
  protected verify: Micra.AuthVerifyCallback<VerifyOptions> = () => {
    throw new HTTPError(401);
  };

  public abstract authenticate(
    request: Request,
    session: Micra.Session,
  ): Promise<Application.Session[Application.AuthSessionKey]>;

  setVerifier(verify: Micra.AuthVerifyCallback<VerifyOptions>) {
    this.verify = verify;
  }
}
