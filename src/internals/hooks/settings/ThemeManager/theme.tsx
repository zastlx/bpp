import {Plugin} from "@utils/types";
import styles from "./styles.module.css";
import { useState } from "react";

export default (plugin: Plugin) => {
    const [started, setStarted] = useState(plugin.started);

    return (
        <div className="styles__infoContainer___2uI-S-camelCase">
            <div className="styles__headerRow___1tdPa-camelCase">
                <div className="styles__infoHeader___1lsZY-camelCase">{plugin.name}</div>
                <div  onClick={() => {
                    plugin.started = !plugin.started;

                    if (started) {
                        plugin.stop();
                    } else {
                        plugin.start();
                    }
                    setStarted(plugin.started);
                }} className={`${styles["toggle-switch"]} ${started ? styles.checked : ""}`}></div>
            </div>
            <div
                className="styles__text___1x37n-camelCase"
                style={{
                    wordWrap: "break-word"
                }}>{plugin.description}</div>
        </div>
    );
}