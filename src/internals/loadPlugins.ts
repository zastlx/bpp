import { Logger } from "@utils/logger";
import BPP from "@api/global";
import eventManager from "./events";
import { pathMatch } from "@utils/other";

export default async () => {
    const logger = new Logger("PluginLoader");

    eventManager.subscribe("@blacket/pageInit", () => {
        BPP.Plugins.startAll((plugin) => {
            if (plugin.started) return false;

            if (Array.isArray(plugin.page)) return plugin.page.every((value) => pathMatch(value) || location.pathname.split("/").includes(value));
            else return pathMatch(plugin.page) || location.pathname.split("/").includes(plugin.page);
        });
    });

    logger.log("Loading plugins...");
    // @ts-expect-error should probably make this less cursed evenutally
    (await Promise.all(Object.values(import.meta.glob("../plugins/*/index.ts")).map((a) => a()))).map(b => b?.default());
    (await import("./patcher.ts")).default();
}