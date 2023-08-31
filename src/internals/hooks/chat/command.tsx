import { Command } from "@utils/types";
import styles from "./chat.module.css";

export default (props: Command) => {
    return (
        <div onClick={props.execute} className={styles["bpp-command"]}>
            <div className={styles["bpp-commandTitle"]}>{"/" + props.name}</div>
            <div className={styles["bpp-commandDesc"]}>{props.description}</div> 
        </div>
    );
};