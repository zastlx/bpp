// document.ben[ =. =+__ (console, = _}
import eventManager from "../events";
import hookSettings from "./settings";
import hookCredits from "./credits";

export default () => {
    switch (location.pathname) {
        case "/settings":
        case "/settings/": {
            eventManager.subscribe("SettingsLoaded", () => hookSettings(".arts__profileBody___eNPbH-camelCase"));
            break;
        }
        case "/credits":
        case "/credits/": {
            eventManager.subscribe("CreditsLoaded", () => hookCredits(".arts__profileBody___eNPbH-camelCase"))
            break;
        }
        default:
            break;
    }
};