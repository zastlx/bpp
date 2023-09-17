import BPP from "@api/global";
import { Logger } from "./logger";
import { Plugin, Patch, PluginDef } from "./types";


const definePlugin = (rawPlugin: PluginDef) => {
    const plugins = BPP.Plugins;
    const patches = BPP.Patcher.patches;

    const logger = new Logger("PluginLoader")

    logger.log(`Loading plugin "${rawPlugin.name}"`);

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
    
    if (!BPP.Settings.plugins[plugin.name]) {
        BPP.Settings.plugins[plugin.name] = {
            enabled: plugin.required ? true : false
        }
    }

    return plugin;
}

export default definePlugin;