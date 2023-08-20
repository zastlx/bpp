import definePlugin, {startPlugins} from "@utils/plugins";
import eventManager from "../internals/events";
import {pathMatch} from "@utils/other";
import blacket from "@api/blacket";

export default() => definePlugin({
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
            file: "/lib/js/credits.js",
            replacement: [
                {
                    match: /blacket\.stopLoading\(\)\;/,
                    replace: "blacket.stopLoading();$self.hooks.credits.loaded();"
                },
                {
                    match: /\$\(\".styles__creditsCreditName___20Cma-camelCase\"\)\.each/,
                    replace: "$self.hooks.credits.hooks.scaleText="
                },
                {
                    match: /\$\(\`#\${id}\`\)\.click\(\(\)/,
                    replace: "$self.hooks.credits.hooks.modal=((credit)"
                },
                {
                    match: /\(\(credit\)\ \=\>\ \{/,
                    replace: "(function(credit){"
                },
                {
                    match: /\=\"\/stats\?name\=\$\{credit\.user\.username\}\"/,
                    replace: "=\"${arguments[1]}\""
                },
            ]
        },
        {
            file: "/lib/js/all.js",
            replacement: [
                {
                    match: /blacket\.socket\.onmessage\s*=\s*\(([^)]+)\)\s*=>\s*{\s*msg\s*=\s*JSON\.parse\(msg\.data\);\s*console\.log\(msg\);\s*}/,
                    replace: ""
                }, {
                    match: /new\ WebSocket/,
                    replace: "new ReconnectingWebSocket"
                }, {
                    match: /console\.log\(\`\[Blacket\] Received heartbeat from server\.\`\)\;/,
                    replace: "BPP.Dispatcher.dispatch(\"BlacketSocketHeartbeat\")"
                }
            ]
        }, {
            file: "/lib/js/game.js",
            replacement: [
                {
                    match: /blacket\.requests\.get\("\/worker\/news",\s*\(data\) => \{/,
                    replace: `$self.fireBlacketLoad();blacket.requests.get("/worker/news", (data) => {`
                }, {
                    match: /blacket\.config\.pages\[page\]\.icon/,
                    replace: "blacket.config.pages[page].icon.replaceAll(\"x-twitter\", \"twitter\")"
                }
            ]
        }, {
            file: "/lib/js/settings.js",
            replacement: [
                {
                    match: /\$\(\"#tradeRequestsButton\"\).click\(\(\) \=\> \{/,
                    replace: `$self.hooks.settings.loaded();$("#tradeRequestsButton").click(() => {`
                }, {
                    match: /\$\(\"\#changePasswordButton\"\)\.click/,
                    replace: "$self.hooks.settings.hooks.changePass="
                }, {
                    match: /\$\(\"\#changeUsernameButton\"\)\.click/,
                    replace: "$self.hooks.settings.hooks.changeUsername="
                }, {
                    match: /\$\(\"#otpButton\"\)\.click/,
                    replace: "$self.hooks.settings.hooks.otp="
                }, {
                    match: /\$\(\"\#friendRequestsButton\"\)\.click/,
                    replace: "$self.hooks.settings.hooks.friendRequests="
                }, {
                    match: /\$\(\"\#tradeRequestsButton\"\)\.click/,
                    replace: "$self.hooks.settings.hooks.tradeRequests="
                }, {
                    match: /\$\(\"\#changeUsernameColorButton\"\)\.click/,
                    replace: "$self.hooks.settings.hooks.changeUsernameColor="
                }, {
                    match: /\$\(\"\#changeDefaultChatColorButton\"\)\.click/,
                    replace: "$self.hooks.settings.hooks.changeDefaultChatColor="
                }
            ]
        }
    ],
    start() {
        //cacheImages(Array.from(document.querySelectorAll("img")).map(img => img.src));
    },
    stop() {
        console.log("uh oh");
    },
    page: "*",
    required: true,
    fireBlacketLoad() {
        eventManager.dispatch("BlacketReady");

        startPlugins((plugin) => {
            if (plugin.required) return true;
            if (plugin.started) return false;
            
            if (Array.isArray(plugin.page)) return plugin.page.some((v) => pathMatch(v));
            else return pathMatch(plugin.page);
        });
    },
    hooks: {
        settings: {
            hooks: {},
            loaded() {
                eventManager.dispatch("SettingsLoaded");
            }
        },
        credits: {
            hooks: {},
            loaded() {
                console.log("WEEEEEEEEEEEEEE")
                eventManager.dispatch("CreditsLoaded");
            }
        }
    }
});