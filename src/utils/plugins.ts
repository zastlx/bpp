import BPP from "@api/global";
import { Logger } from "./logger";
import { Plugin, Patch, PluginDef, PluginSetting, PluginSettingsConfig, SettingsTypes } from "./types";

const pluginSettingsToConfig = (pluginSettings: PluginSetting) => {
    const config: PluginSettingsConfig = {
        name: pluginSettings.name,
        value: pluginSettings.default
    };

    return config;
};

const definePlugin = (rawPlugin: PluginDef) => {
    (new Logger("PluginLoader")).log(`Loading plugin "${rawPlugin.name}"`);

    const plugins = BPP.Plugins;
    const patches = BPP.Patcher.patches; 

    const plugin = rawPlugin as Plugin;
    plugin.started = false;

    if (plugin.patches) {
        plugin.patches = plugin.patches.map((patch) => {
            return {
                ...patch,
                plugin: plugin.name
            } as Patch;
        });

        patches.push(...plugin.patches);
    }
    plugins.plugins[plugin.name] = plugin;

    if (!BPP.Settings.plugins[plugin.name]) BPP.Settings.plugins[plugin.name] = {
        enabled: plugin.required ? true : false,
        settings: plugin.settings ? plugin.settings.map(pluginSettingsToConfig) : []
    };

    if (plugin.settings) {
        plugin.settings.forEach((setting) => {
            if (!BPP.Settings.plugins[plugin.name].settings.find((a) => a.name === setting.name)) {
                BPP.Settings.plugins[plugin.name].settings.push(pluginSettingsToConfig(setting));
            }
        });
    }

    return plugin;
}

export { pluginSettingsToConfig };
export default definePlugin;