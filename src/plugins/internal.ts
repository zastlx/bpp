import definePlugin from "@utils/plugins";
import BPP from "@api/global";
import axios from "axios";
import eventManager from "../internals/events";

export default () => definePlugin({
    name: "Internals",
    description: "This plugin is internally used by Blacket++, Ignore it.",
    authors: [
        {
            name: "zastix",
            id: "0"
        }
    ],
    patches: [
        {
            file: "/lib/js/all.js",
            replacement: [
                {
                    match: /blacket\.socket\.onmessage\s*=\s*\(([^)]+)\)\s*=>\s*{\s*msg\s*=\s*JSON\.parse\(msg\.data\);\s*console\.log\(msg\);\s*}/,
                    replace: ""
                },
                {
                    match: /new\ WebSocket/,
                    replace: "new ReconnectingWebSocket"
                }
            ]
        },
        {
            file: "/lib/js/game.js",
            replacement: [
                {
                    match: /blacket\.requests\.get\("\/worker\/news",\s*\(data\) => \{/,
                    replace: `$self.fireBlacketLoad();blacket.requests.get("/worker/news", (data) => {`
                },
                {
                    match: /blacket\.config\.pages\[page\]\.icon/,
                    replace: "blacket.config.pages[page].icon.replaceAll(\"x-twitter\", \"twitter\")"
                },
            ]
        },
        {
            file: "/lib/js/settings.js",
            replacement: [
                {
                    match: /\$\(\"#tradeRequestsButton\"\).click\(\(\) \=\> \{/,
                    replace: `$self.settings.settingsLoaded();$("#tradeRequestsButton").click(() => {`
                },
                {
                    match: /\$\(\"\#changePasswordButton\"\)\.click/,
                    replace: "$self.settings.hooks.changePass="
                },
                {
                    match: /\$\(\"\#changeUsernameButton\"\)\.click/,
                    replace: "$self.settings.hooks.changeUsername="
                },
                {
                    match: /\$\(\"#otpButton\"\)\.click/,
                    replace: "$self.settings.hooks.otp="
                },
                {
                    match: /\$\(\"\#friendRequestsButton\"\)\.click/,
                    replace: "$self.settings.hooks.friendRequests="
                },
                {
                    match: /\$\(\"\#tradeRequestsButton\"\)\.click/,
                    replace: "$self.settings.hooks.tradeRequests="
                },
                {
                    match: /\$\(\"\#changeUsernameColorButton\"\)\.click/,
                    replace: "$self.settings.hooks.changeUsernameColor="
                },
                {
                    match: /\$\(\"\#changeDefaultChatColorButton\"\)\.click/,
                    replace: "$self.settings.hooks.changeDefaultChatColor="
                },

            ]
        }
    ],
    start() {
        // document.querySelectorAll("a").forEach((element) => {
        //     console.log(element);
        //     element.addEventListener("click", async (e) => {
        //         e.preventDefault();
        //         e.stopPropagation();

        //         console.log((await axios.get(element.href)).data);
        //     })
        // });
    },
    stop() {
        console.log("real");
    },
    required: true,
    fireBlacketLoad() {
        eventManager.dispatch("BlacketReady");
        Object.keys(BPP.Plugins).forEach((key) => BPP.Plugins[key].start());
    },
    settings: {
        hooks: {},
        settingsLoaded() {
            eventManager.dispatch("SettingsLoaded");
        },
    }
});