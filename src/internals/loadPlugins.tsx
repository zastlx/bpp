import BPP from "@api/global";
import { Logger } from "@utils/logger";

export default async () => {
    const logger = new Logger("PluginLoader");

    logger.log("Loading plugins...");

    // @ts-expect-error should probably make this less cursed evenutally
    (await Promise.all(Object.values(import.meta.glob("../plugins/*")).map((a) => a()))).map(b => b?.default());

    (await import("./patcher")).default();
}