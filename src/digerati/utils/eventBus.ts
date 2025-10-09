// src/digerati/utils/eventBus.ts

type Listener<Payload> = (payload: Payload) => void;
type ListenerMap<Events extends Record<string, unknown>> = {
  [K in keyof Events]?: Set<Listener<Events[K]>>;
};

export class EventBus<Events extends Record<string, any>> {
  private listeners: ListenerMap<Events> = {};

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): () => void {
    const set = this.listeners[event] ?? new Set<Listener<Events[K]>>();
    set.add(listener);
    this.listeners[event] = set;
    return () => this.off(event, listener);
  }

  off<K extends keyof Events>(event: K, listener: Listener<Events[K]>): void {
    const set = this.listeners[event];
    if (!set) return;
    set.delete(listener);
    if (set.size === 0) {
      delete this.listeners[event];
    }
  }

  emit<K extends keyof Events>(event: K): Events[K] extends void ? void : never;
  emit<K extends keyof Events>(event: K, payload: Events[K]): void;
  emit<K extends keyof Events>(event: K, payload?: Events[K]): void {
    const set = this.listeners[event];
    if (!set) return;

    Array.from(set).forEach((listener) => {
      try {
        listener(payload as Events[K]);
      } catch (e) {
        console.error(`[EventBus] listener for "${String(event)}" threw`, e);
      }
    });
  }

  once<K extends keyof Events>(event: K, listener: Listener<Events[K]>): void {
    const unsubscribe = this.on(event, (payload) => {
      unsubscribe();
      listener(payload);
    });
  }
}
