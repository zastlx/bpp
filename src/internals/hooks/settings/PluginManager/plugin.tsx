import {Plugin} from "@utils/types";
import styles from "./styles.module.css";
import { useState } from "react";

export default (plugin: Plugin) => {
    const [started, setStarted] = useState(plugin.started);

    return (
        <div className="styles__infoContainer___2uI-S-camelCase">
            <div className="styles__headerRow___1tdPa-camelCase">
                <div className="styles__infoHeader___1lsZY-camelCase">{plugin.name}</div>
                <div style={plugin.required ? {
                    filter: "brightness(0.5)",
                    cursor: "not-allowed"
                } : {}} onClick={() => {
                    if (plugin.required) return;
                    plugin.started = !plugin.started;

                    setStarted(!started);
                    if (started) {
                        plugin.stop();
                    } else {
                        plugin.start();
                    }
                }} className={`${styles["toggle-switch"]} ${started? styles.checked : ""}`}></div>
            </div>
            <div
                className="styles__text___1x37n-camelCase"
                style={{
                    wordWrap: "break-word"
                }}>{plugin.description}</div>
        </div>
    );
}