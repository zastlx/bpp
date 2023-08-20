import ReactDOM from "react-dom/client";
import react from "react";
import loadPlugins from "./internals/loadPlugins";
import { Global } from "@utils/types";
import hooker from "./internals/hooks/hooker";
import eventManager from "./internals/events";

// @ts-expect-error THINGY
fetch("https://raw.githubusercontent.com/joewalnes/reconnecting-websocket/master/reconnecting-websocket.min.js").then(a => a.text()).then(unsafeWindow.eval)

const BPP: Global = {
    Common: {
        React: react,
        ReactDOM: ReactDOM
    },
    Plugins: {},
    Patches: [],
    Dispatcher: eventManager
};
//@ts-expect-error define global
unsafeWindow.BPP = BPP;
export { BPP };

loadPlugins();
hooker();