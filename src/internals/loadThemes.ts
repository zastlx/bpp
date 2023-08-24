import BPP from "@api/global"
import axios from "axios"
import parseMetaData from "./parsing/parseMetadata"

export default async () => {
    for (let theme of BPP.Settings.themeLinks) {
        const { data } = await axios.get(theme);
        const metaData = parseMetaData(data);

        const themeStyle = document.createElement("style");
        themeStyle.id = `bpp-${metaData.id}`;
        document.head.appendChild(themeStyle);
    }
}