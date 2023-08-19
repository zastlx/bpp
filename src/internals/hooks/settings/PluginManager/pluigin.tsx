import {Plugin} from "@utils/types";
import styles from "./styles.module.css";

export default(plugin : Plugin) => {

    return (
        <div className="styles__infoContainer___2uI-S-camelCase">
            <div className="styles__headerRow___1tdPa-camelCase">
                <div className="styles__infoHeader___1lsZY-camelCase">{plugin.name}</div>
                <div className={`${styles["toggle-switch"]} ${plugin.started ? styles.checked : ""}`}></div>
            </div>
            <div
                className="styles__text___1x37n-camelCase"
                style={{
                    wordWrap: "break-word"
                }}>{plugin.description}</div>
        </div>
    )
}