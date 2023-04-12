import {MicraError} from '@micra/error';

export class ValidationError extends MicraError implements Micra.Error {
  statusCode = 422;

  list: Micra.ErrorMessage[];

  constructor(message?: Micra.ErrorMessage) {
    super('Invalid data');
    this.list = message ? [message] : [];
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  push(message: Partial<Micra.ErrorMessage>): void {
    this.list.push({
      status: 422,
      title: 'Invalid data',
      ...message,
    });
  }

  serialize(): Micra.ErrorMessage[] {
    return this.list.slice();
  }
}
