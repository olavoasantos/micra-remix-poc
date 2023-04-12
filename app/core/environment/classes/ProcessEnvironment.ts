import {EventEmitter} from '@micra/event-emitter';

export class ProcessEnvironment
  extends EventEmitter
  implements Micra.Environment
{
  #env!: Partial<Application.EnvironmentVariables>;

  all<
    Definitions extends Partial<Application.EnvironmentVariables>,
  >(): Definitions {
    return this.#env as Definitions;
  }

  get<Key extends keyof Application.EnvironmentVariables>(
    key: Key,
    fallback?: Application.EnvironmentVariables[Key],
  ): Application.EnvironmentVariables[Key] | undefined {
    return this.#env[key] ?? fallback;
  }

  has<Key extends keyof Application.EnvironmentVariables>(key: Key): boolean {
    return key in this.#env;
  }

  async init(): Promise<void> {
    this.#env = process.env;
  }

  initSync(): void {
    this.#env = process.env;
  }

  validate(_validator: Micra.EnvironmentValidator): void {
    //
  }
}
