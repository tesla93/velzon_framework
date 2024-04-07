
/**
 * Use this class for storing application data instead of direct localStorage or sessionStorage.
 * */
export class AppStorage {

    public static readonly SimulatedHttpStatusCodeKey = "simulated-http-status-code";
  
    /**
     * Uses a "localStorage" to store a data or delete item if "null" specified.
     * @param key The ksy of stored object.
     * @param item Stored value.
     * */
    static setItem(key: string, item: any): void {
        if (item == null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(item));
        }
    }

    /**
     * Uses a "sessionStorage" to store a data or delete item if "null" specified.
     * @param key The ksy of stored object.
     * @param item Stored value.
     * */
    static setItemForSession(key: string, item: any): void {
        if (item == null) {
            sessionStorage.removeItem(key);
        } else {
            sessionStorage.setItem(key, JSON.stringify(item));
        }
    }

    /**
     * Uses a "localStorage" to get a stored data or "null" if nothing found or fetched data could not be parsed.
     * @param key The ksy of stored object.
     * */
    static getItem<T = string>(key: string): T {
        const storedString = localStorage.getItem(key);

        if (storedString == null) return {} as T;

        try {
            return JSON.parse(storedString) as T;
        } catch (error) {
            return {} as T;
        }
    }

    /**
     * Uses a "sessionStorage" to get a stored data or "null" if nothing found or fetched data could not be parsed.
     * @param key The ksy of stored object.
     * */
    static getItemFromSession<T>(key: string): T {
        const storedSessionString = sessionStorage.getItem(key);

        if (storedSessionString == null) return {} as T;

        try {
            return JSON.parse(storedSessionString) as T;
        } catch (error) {
            return {} as T;
        }
    }

    static removeItem(key: string){
        localStorage.removeItem(key)
    }
}