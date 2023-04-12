import {EventTarget} from '../EventTarget';
import {Event} from '../Event';

describe('EventTarget', () => {
  it('should add and remove an event listener', () => {
    const target = new EventTarget<{foo: string}>();
    const listener = {
      handle: vi.fn(),
    };

    const remove = target.addEventListener('foo', listener);
    const event = new Event<'foo'>('foo', 'bar');
    expect(target.dispatchEvent(event)).toBeUndefined();
    expect(listener.handle).toHaveBeenCalledWith(event);
    listener.handle.mockClear();

    remove();
    expect(target.dispatchEvent(new Event('foo', 'baz'))).toBeUndefined();
    expect(listener.handle).not.toHaveBeenCalled();
  });

  it('should add and remove a one-time event listener', () => {
    const target = new EventTarget<{foo: string}>();
    const listener = {
      handle: vi.fn(),
      once: true,
    };

    target.addEventListener('foo', listener);
    const event = new Event<'foo'>('foo', 'bar');
    target.dispatchEvent(event);
    expect(listener.handle).toHaveBeenCalledWith(event);
    listener.handle.mockClear();

    target.dispatchEvent(new Event('foo', 'baz'));
    expect(listener.handle).not.toHaveBeenCalled();
  });

  it('should prevent the default action of an event', () => {
    const target = new EventTarget<{foo: string}>();
    const listener = {
      handle: (event: Micra.Event) => {
        event.preventDefault();
      },
    };

    target.addEventListener('foo', listener);
    const event = new Event<'foo'>('foo');
    target.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('should stop the propagation of an event', () => {
    const target2 = new EventTarget<{foo: string}>();
    const target1 = new EventTarget<{foo: string}>(target2);
    const listener1 = {
      handle: (event: Micra.Event) => {
        event.stopPropagation();
      },
    };
    const listener2 = {
      handle: vi.fn(),
    };

    target1.addEventListener('foo', listener1);
    target2.addEventListener('foo', listener2);
    target1.dispatchEvent(new Event('foo'));
    expect(listener2.handle).not.toHaveBeenCalled();
  });

  it('should stop the immediate propagation of an event', () => {
    const target1 = new EventTarget<{foo: string}>();
    const listener1 = {
      handle: (event: Micra.Event) => {
        event.stopImmediatePropagation();
      },
    };
    const listener2 = {
      handle: vi.fn(),
    };

    target1.addEventListener('foo', listener1);
    target1.addEventListener('foo', listener2);
    target1.dispatchEvent(new Event('foo'));
    expect(listener2.handle).not.toHaveBeenCalled();
  });
});
