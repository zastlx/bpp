import ReactDOM from "react-dom/client";
import react from "react";
import loadPlugins from "./internals/loadPlugins";
import { Global } from "@utils/types";
import hooker from "./internals/hooks/hooker";
import eventManager from "./internals/events";
import configManager from "./internals/configManager";
import loadThemes from "internals/loadThemes";

// @ts-expect-error THINGY
fetch("https://raw.githubusercontent.com/joewalnes/reconnecting-websocket/master/reconnecting-websocket.min.js").then(a => a.text()).then(unsafeWindow.eval)

const BPP: Global = {
    Common: {
        React: react,
        ReactDOM: ReactDOM
    },
    Plugins: {
        loadedRequirments: [],
        plugins: {},
        startAll: (predicate = () => true) => {
            for (const pluginKey in BPP.Plugins.plugins) {
                const plugin = BPP.Plugins.plugins[pluginKey];
                
                if (predicate(plugin)) plugin.start();
                plugin.started = true;
            }
        }
    },
    Patcher: {
        files: [],
        patches: [],
        testPatch: function(replacement, filename) {
            const file = BPP.Patcher.files.find((e) => e.name === filename);
            if (!file) return false;
            
            const matchRegex = new RegExp(replacement.match, "g");
            return matchRegex.test(file.data);
        }
    },
    Dispatcher: eventManager,
    Settings: configManager.getConfig()
};
//@ts-expect-error define global
unsafeWindow.BPP = BPP;
export { BPP };

loadPlugins();
hooker();
loadThemes();