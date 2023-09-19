// stolen from nebulet :3
class EventManager {
    #_subscriptions = new Map();

    subscribe(event: string, callback: () => void): () => void {
        if (typeof callback !== "function") {
            console.warn("EventManager: Callback must be a function.");
            return () => {};
        }
        if (!this.#_subscriptions.has(event)) this.#_subscriptions.set(event, new Set());

        this.#_subscriptions.get(event).add(callback);

        return () => this.unsubscribe(event, callback);
    }

    unsubscribe(event: string, callback: () => void) {
        if (this.#_subscriptions.has(event)) this.#_subscriptions.get(event).delete(callback);
        else console.warn(`EventManager: Event "${event}" does not exist.`);
    }

    dispatch(event: string, payload?: any) {
        if (this.#_subscriptions.has(event)) this.#_subscriptions.get(event).forEach(callback => callback(payload));
        else console.warn(`EventManager: Event "${event}" does not exist.`);
    }
}


const eventManager = new EventManager();
export default eventManager;
export { EventManager };