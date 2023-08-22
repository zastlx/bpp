import BPP from "@api/global";
import { BlacketCredit } from "@utils/types";
import { useEffect } from "react";

export default ({role, name, note, img, color, raw, url}: {
    role: string;
    name: string;
    note: string;
    img: string;
    color: string;
    url?: string;
    raw: BlacketCredit;
}) => {
    useEffect(() => {
        document.querySelectorAll(".styles__creditsCreditName___20Cma-camelCase").forEach((elem) => BPP.Plugins.plugins["Internals"].hooks.credits.hooks.scaleText.call(elem))
    }, []);
    
    return (
        <div onClick={() => {
            BPP.Plugins.plugins["Internals"].hooks.credits.hooks.modal(raw, url ?? `/stats?name=${name}`);
        }} className="styles__creditsCreditContainer___bej3a-camelCase">
            <img className="styles__creditsCreditAvatar___4939A-camelCase" src={img} draggable="false" />
            <div style={{
                color: color === "rainbow" ? "" : color
            }} className={`styles__creditsCreditName___20Cma-camelCase ${color === "rainbow" ? "rainbow" : ""}`}>[{role}] {name}</div>
            <div className="styles__creditsCreditNote___9benj-camelCase">{note}</div>
        </div>
    )
}