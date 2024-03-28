import { PluginSetting, SettingsTypes } from "@utils/types";
import { BPP } from "main";
import styles from "./styles.module.css";
import types from "./types";

export default (settings: PluginSetting[]) => {
    return (
        <div className="styles__holder___3CEfN-camelCase" style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div className={styles.settingsContainer}>
                {
                    settings.map((setting, i) => {
                        switch (setting.type) {
                            case SettingsTypes.BOOLEAN:
                                return (
                                    <types.boolean description={setting.description} name={setting.name} value={BPP.Settings./>
                                );
                            case SettingsTypes.NUMBER:
                            case SettingsTypes.STRING:
                                return (
                                    <types.input />
                                );
                            case SettingsTypes.SELECT:
                                return (
                                    <types.selector {...setting} />
                                );
                            default:
                                return null;
                        }
                        
                        return (
                            <Setting key={i} {...setting} />
                        );
                    })
                }
            </div>
        </div>
    );
}