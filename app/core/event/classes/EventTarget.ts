import {SET_CURRENT_TARGET, SET_TARGET} from '../constants';

export class EventTarget<
  Events extends Record<string, any> = Record<string, any>,
> implements Micra.EventTarget<EventTarget>
{
  listeners: Map<keyof Events, Set<Micra.EventListener<Micra.Event>>> =
    new Map();

  constructor(public readonly parent?: EventTarget<Events>) {}

  addEventListener<Type extends keyof Events>(
    type: Type,
    listener:
      | Micra.EventListener<Micra.Event<Type, Events[Type]>>
      | Micra.EventListener<Micra.Event<Type, Events[Type]>>['handle'],
  ): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }

    this.listeners
      .get(type)!
      .add(typeof listener === 'function' ? {handle: listener} : listener);
    return () => this.removeEventListener(type, listener);
  }

  removeEventListener<Type extends keyof Events>(
    type: Type,
    listener:
      | Micra.EventListener<Micra.Event<Type, Events[Type]>>
      | Micra.EventListener<Micra.Event<Type, Events[Type]>>['handle'],
  ): void {
    if (this.listeners.has(type)) {
      this.listeners
        .get(type)!
        .delete(typeof listener === 'function' ? {handle: listener} : listener);
    }
  }

  dispatchEvent<Type extends keyof Events>(
    event: Micra.Event<Type, Events[Type]>,
  ): void {
    if (!event.target) {
      (event as any)[SET_TARGET] = this;
    }

    (event as any)[SET_CURRENT_TARGET] = this;

    if (this.listeners.has(event.type)) {
      for (const listener of this.listeners.get(event.type)!) {
        listener.handle(event);
        if (listener.once) {
          this.removeEventListener(event.type, listener);
        }

        if (event.immediatePropagationStopped) {
          return;
        }

        if (event.propagationStopped) {
          break;
        }
      }
    }

    if (event.bubbles && this.parent) {
      this.parent.dispatchEvent(event);
    }
  }
}
