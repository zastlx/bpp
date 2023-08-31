// document.ben[ =. =+__ (console, = _}
import eventManager from "../events";
import hookSettings from "./settings";
import hookCredits from "./credits";
import hookChat from "./chat";

export default () => {
    switch (location.pathname) {
        case "/settings":
        case "/settings/": {
            eventManager.subscribe("@blacket/pageInit", () => hookSettings(".arts__profileBody___eNPbH-camelCase"));
            break;
        }
        case "/credits":
        case "/credits/": {
            eventManager.subscribe("@blacket/pageInit", () => hookCredits(".arts__profileBody___eNPbH-camelCase"))
            break;
        }
        case "/chat":
        case "/chat/": {
            eventManager.subscribe("@blacket/pageInit", () => {
                const cmdBox = document.createElement("div");
                cmdBox.id = "read_if_cute";
                document.querySelector("#app > div > div.arts__profileBody___eNPbH-camelCase > div:nth-child(5)").appendChild(cmdBox);
                
                hookChat("#read_if_cute")
            });
            break;
        }
        default:
            break;
    }
};