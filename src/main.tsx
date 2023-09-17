import ReactDOM from "react-dom/client";
import react from "react";
import loadPlugins from "@internals/loadPlugins";
import { Global } from "@utils/types";
import hooker from "@internals/hooks/hooker";
import eventManager from "@internals/events";
import configManager from "@internals/configManager";
import loadThemes from "@internals/loadThemes";
import blacket from "@api/blacket";

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

                plugin?.commands?.forEach((cmd) => BPP.Commands.commands.push(cmd));
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
    Commands: {
        commands: [
            {
                name: "hack",
                description: "Bruteforces a users credit card number",
                execute() {
                    blacket().socket.emit("chat", "i hackinmg you @blooket");
                }
            }
        ],
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