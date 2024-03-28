import { Plugin } from "@utils/types";
import styles from "./styles.module.css";
import { useState } from "react";
import PluginBtn from "./pluginBtn";
import { alertUtil } from "@api/util";
import PluginSettings from "./pluginSettings";
/*
<div class="styles__headerRow___1tdPa-camelCase"><div class="styles__infoHeader___1lsZY-camelCase">Internals</div><div style="
   display: flex;
   margin-left: auto;
   flex-wrap: wrap;
   gap: 20px;
"><div class="_bpp-toggle-switch_sw5zo_1 _checked_sw5zo_45" style="filter: brightness(0.5); cursor: not-allowed;"></div></div></div>
                               */
export default (plugin: Plugin) => {
    const [started, setStarted] = useState(plugin.started);

    return (
        <div style={{
            width: "515px"
        }} className="styles__infoContainer___2uI-S-camelCase">
            <div className="styles__headerRow___1tdPa-camelCase">
                <div className="styles__infoHeader___1lsZY-camelCase">{plugin.name}</div>
                <div style={{
                    display: "flex",
                    marginLeft: "auto",
                    flexWrap: "wrap",
                    gap: "20px"
                }}>
                    <PluginBtn icon="fa-cog" color="#515050" onClick={() => {
                        alertUtil(plugin.name, <PluginSettings />);
                    }}/>

                    <div style={plugin.required ? {
                        filter: "brightness(0.5)",
                        cursor: "not-allowed"
                    } : {}} onClick={() => {
                        if (plugin.required) return;
                        plugin.started = !plugin.started;
                        setStarted(plugin.started);

                        if (!plugin.stop && !plugin.start) return;
                        if (started) {
                            plugin?.stop();
                        } else {
                            plugin?.start();
                        }
                    }} className={`${styles["bpp-toggle-switch"]} ${started ? styles.checked : ""}`} />
                </div>

            </div>
            <div
                className="styles__text___1x37n-camelCase"
                style={{
                    wordWrap: "break-word"
                }}>{plugin.description}</div>
        </div>
    );
}

/*
<div style={plugin.required ? { 
                    filter: "brightness(0.5)", 
                    cursor: "not-allowed" 
                } : {}} onClick={() => { 
                    if (plugin.required) return; 
                    plugin.started = !plugin.started; 
                    setStarted(plugin.started); 
                    
                    if (!plugin.stop && !plugin.start) return;
                    if (started) { 
                        plugin?.stop(); 
                    } else { 
                        plugin?.start(); 
                    } 
                }} className={`${styles["bpp-toggle-switch"]} ${started ? styles.checked : ""}`} /> 
                */