declare global {
  namespace Micra {
    interface Event<Type = any, Data = any> {
      readonly type: Type;
      readonly data: Data;
      readonly bubbles: boolean;
      readonly cancelable: boolean;
      readonly timeStamp: number;
      readonly defaultPrevented: boolean;
      readonly propagationStopped: boolean;
      readonly immediatePropagationStopped: boolean;
      readonly currentTarget: EventTarget<any>;
      readonly target: EventTarget<any>;
      stopPropagation(): void;
      preventDefault(): void;
      stopImmediatePropagation(): void;
    }

    interface EventTarget<Events extends Record<string, any>> {
      addEventListener<Type extends keyof Events>(
        type: Type,
        listener:
          | EventListener<Event<Type, Events[Type]>>
          | EventListener<Event<Type, Events[Type]>>['handle'],
      ): () => void;

      removeEventListener<Type extends keyof Events>(
        type: Type,
        listener:
          | EventListener<Event<Type, Events[Type]>>
          | EventListener<Event<Type, Events[Type]>>['handle'],
      ): void;

      dispatchEvent<Type extends keyof Events>(
        event: Event<Type, Events[Type]>,
      ): void;
    }

    interface EventListener<E extends Event> {
      readonly once?: boolean;
      handle(event: E): Promise<void> | void;
    }
  }
}

export {};
