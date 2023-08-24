import {
    BPP
} from "../main";

class ConfigManager {
    getConfig() {
        try {
            const loaded = JSON.parse(localStorage.getItem("bpp-conf"));
            if (!loaded) return this.setConfig(JSON.stringify({
                plugins: {},
                themeLinks: [],
                autoUpdate: true
            }));

            return loaded;
        } catch {
            return this.setConfig(JSON.stringify({
                plugins: {},
                themeLinks: [],
                autoUpdate: true
            }));
        }
    }

    setConfig(newConfig) {
        localStorage.setItem("bpp-conf", newConfig);
        return this.getConfig();
    }

    syncConfig() {
        this.setConfig(JSON.stringify(BPP.Settings));
    }
}

const configManager = new ConfigManager();
export default configManager;