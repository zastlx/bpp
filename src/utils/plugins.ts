import BPP from "@api/global";
import { Logger } from "./logger";
import { Plugin, Patch, PluginDef } from "./types";


const definePlugin = (rawPlugin: PluginDef) => {
    const plugins = BPP.Plugins;
    const patches = BPP.Patches;

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

    plugins[plugin.name] = plugin;

    return plugin;
}

const startPlugins = (predicate: (plugin: Plugin) => boolean = (plugin: Plugin) => true) => {
    for (const pluginKey in BPP.Plugins) {
        const plugin = BPP.Plugins[pluginKey]; 
        
        if (predicate(plugin)) plugin.start();
        plugin.started = true;
    }
};

export default definePlugin;
export { startPlugins };