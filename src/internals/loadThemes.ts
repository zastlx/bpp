import BPP from "@api/global";
import parseMetaData from "./parsing/parseMetadata";
import { Logger } from '../utils/logger';

export default async () => {
    const logger = new Logger("ThemeLoader");
    logger.log("Loading themes...");
    for (let theme of BPP.Settings.themeLinks) {
        // @ts-ignore
        GM.xmlHttpRequest({
            method: "GET",
            url: theme,
            onload: (res) => {
                let data = res.responseText;

                const metaData = parseMetaData(data);
                try {
                    metaData.autoimportant = JSON.parse(metaData.autoimportant);
                } catch (e) {
                    logger.error("Metadata value \"@autoimportant\" was not \"true\" or \"false\", defaulting to true");
                    metaData.autoimportant = true;
                }

                const themeStyle = document.createElement("style");
                themeStyle.id = `bpp-${metaData.id}`;
                if (metaData.autoimportant === true || !(typeof metaData.autoimportant === "boolean")) data = data.replaceAll(/([^;{}]*:[^;{}]*);/g, '$1 !important');
                themeStyle.innerHTML = data;

                document.head.appendChild(themeStyle);
            }
        });
    }
}