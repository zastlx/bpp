import { Logger } from "@utils/logger";
import BPP from "@api/global";
import eventManager from "./events";

export default async () => {
    const events = ["@blacket/stats", "@blacket/credits", "@blacket/chat", "@blacket/blooks", "@blacket/market", "@blacket/bazaar"];
    let loadedEvents = [];

    eventManager.subscribe("blacket/*", () => {
        BPP.Plugins.startAll((plugin) => {
            if (plugin.started) return false;

            return true;
        });
    });

    for (const event of events) {
        eventManager.subscribe(event, () => {
            loadedEvents.push(event);

            BPP.Plugins.startAll((plugin) => {
                console.log(plugin)
                if (plugin.started) return false;

                if (Array.isArray(plugin.requires)) {
                    console.log(plugin.requires.every((value) => loadedEvents.includes(value)));
                    console.log
                    return plugin.requires.every((value) => loadedEvents.includes(value));
                } else {
                    console.log(plugin.requires().every((value) => loadedEvents.includes(value)));
                    return plugin.requires().every((value) => loadedEvents.includes(value));
                }
            });

            if (loadedEvents === events) {
                eventManager.dispatch("@blacket/*");
            }
        });
    }
    const logger = new Logger("PluginLoader");

    logger.log("Loading plugins...");

    // @ts-expect-error should probably make this less cursed evenutally
    (await Promise.all(Object.values(import.meta.glob("../plugins/*")).map((a) => a()))).map(b => b?.default());

    (await import("./patcher")).default();
}