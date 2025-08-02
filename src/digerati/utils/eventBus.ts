// src/digerati/utils/eventBus.ts

type Listener<Payload> = (payload: Payload) => void;

export class EventBus<Events extends Record<string, any>> {
    private listeners = new Map<keyof Events, Set<Listener<any>>>();

    on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): () => void {
        const set = this.listeners.get(event) ?? new Set();
        set.add(listener as Listener<any>);
        this.listeners.set(event, set);
        // return unsubscribe
        return () => this.off(event, listener);
    }

    off<K extends keyof Events>(event: K, listener: Listener<Events[K]>): void {
        const set = this.listeners.get(event);
        if (!set) return;
        set.delete(listener as Listener<any>);
        if (set.size === 0) {
            this.listeners.delete(event);
        }
    }

    emit<K extends keyof Events>(event: K, payload: Events[K]): void {
        const set = this.listeners.get(event);
        if (!set) return;
        // copy to avoid mutation during iteration
        Array.from(set).forEach((listener) => {
            try {
                (listener as Listener<Events[K]>)(payload);
            } catch (e) {
                // Fallback log; don't throw from bus
                console.error(`[EventBus] listener for "${String(event)}" threw`, e);
            }
        });
    }

    once<K extends keyof Events>(event: K, listener: Listener<Events[K]>): void {
        const unsub = this.on(event, (payload) => {
            unsub();
            listener(payload);
        });
    }
}
