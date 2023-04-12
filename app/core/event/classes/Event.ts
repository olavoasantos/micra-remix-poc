import {SET_CURRENT_TARGET, SET_TARGET} from '../constants';

export class Event<Type = any, Data = any> implements Micra.Event<Type, Data> {
  private readonly _type: Type;
  get type(): Type {
    return this._type;
  }

  private readonly _data: Data;
  get data(): Data {
    return this._data;
  }

  readonly bubbles = false;

  readonly cancelable = false;

  private _timeStamp: number = Date.now();
  get timeStamp(): number {
    return this._timeStamp;
  }

  private _defaultPrevented = false;
  get defaultPrevented(): boolean {
    return this._defaultPrevented;
  }

  private _propagationStopped = false;
  get propagationStopped(): boolean {
    return this._propagationStopped;
  }
  private _immediatePropagationStopped = false;
  get immediatePropagationStopped(): boolean {
    return this._immediatePropagationStopped;
  }

  private _currentTarget!: Micra.EventTarget<any>;
  get currentTarget(): Micra.EventTarget<any> {
    return this._currentTarget;
  }

  private _target!: Micra.EventTarget<any>;
  get target(): Micra.EventTarget<any> {
    return this._target;
  }

  constructor(type: Type, data: Data = undefined as Data) {
    this._type = type;
    this._data = data;

    Object.defineProperty(this, SET_TARGET, {
      configurable: false,
      enumerable: false,
      writable: true,
      value: (target: Micra.EventTarget<any>) => {
        this._target = target;
      },
    });
    Object.defineProperty(this, SET_CURRENT_TARGET, {
      configurable: false,
      enumerable: false,
      writable: true,
      value: (target: Micra.EventTarget<any>) => {
        this._currentTarget = target;
      },
    });
  }

  stopPropagation(): void {
    this._propagationStopped = true;
  }

  preventDefault(): void {
    this._defaultPrevented = true;
  }

  stopImmediatePropagation(): void {
    this._immediatePropagationStopped = true;
  }
}
