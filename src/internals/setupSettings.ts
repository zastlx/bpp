import { Settings } from "@utils/types";
import configManager from "./configManager"

export default (): Settings => {
    const cachedConfig = configManager.getConfig();

    const proxiedSettings = new Proxy(cachedConfig, {
        set: (target, property, value) => {
            target[property] = value;
            return true;
        },
        get: (target, property) => {
            return target[property];
        }
    });

    return proxiedSettings;
}