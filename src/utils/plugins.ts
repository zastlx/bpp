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
        patches.push(...plugin.patches.map((patch) => {
            return {
                ...patch,
                plugin: plugin.name
            } as Patch;
        }));
    }
    plugins[plugin.name] = plugin;

    return plugin;
}

export default definePlugin;