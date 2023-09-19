import BPP from "@api/global";
import parseMetaData from "./parsing/parseMetadata";
import { Logger } from '../utils/logger';
import userStore from "@api/userStore";

export default async () => {
    [...document.querySelectorAll(`[id*="bpp-theme"]`)].forEach((v) => v.remove());

    const logger = new Logger("ThemeLoader");
    logger.log("Loading themes...");
    for (let theme of BPP.Settings.themeLinks) {
        // @ts-ignore
        GM.xmlHttpRequest({
            method: "GET",
            url: theme,
            onload: async (res) => {
                let data = res.responseText;

                const metaData = parseMetaData(data) as {
                    autoimportant: string;
                    description: string;
                    id: string;
                    author: string;
                };
                let autoImportant: boolean;
                try {
                    // @ts-ignore
                    metaData.autoimportant = JSON.parse(metaData.autoimportant);
                } catch (e) {
                    logger.error("Metadata value \"@autoimportant\" was not \"true\" or \"false\", defaulting to true");
                    autoImportant = true;
                }

                const themeStyle = document.createElement("style");
                themeStyle.id = `bpp-theme-${metaData.id}`;
                if (autoImportant === true || !(typeof metaData.autoimportant === "boolean")) data = data.replaceAll(/([^;{}]*:[^;{}]*);/g, '$1 !important;');
                themeStyle.innerHTML = data;
                BPP.Themes.themes.push({
                    element: themeStyle,
                    name: metaData.id,
                    authors: await Promise.all(metaData.author.split(", ").map(async (id) => await userStore.getUser(id))),
                    description: metaData.description,
                    forcedImportant: autoImportant,
                    url: theme,
                    delete: () => {}
                });
                BPP.Dispatcher.dispatch("@bpp/update/themes");

                document.head.appendChild(themeStyle);
            }
        });
    }
}