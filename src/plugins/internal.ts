import definePlugin from "@utils/plugins";
import eventManager from "../internals/events";
import * as spitroast from "spitroast";
import BPP from "@api/global";
import blacket from "@api/blacket";
import { DEVS, customBadges } from "@utils/constants";

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
            file: "/lib/js/chat.js",
            replacement: [
                {
                    match: /blacket\.socket\.on\(\"chat\"\,/,
                    replace: "$self.hooks.chat.hooks.receiveMessageSocket=("
                }
            ]
        },        {
            file: "/lib/js/stats.js",
            replacement: [
                {
                    match: /if\ \(blacket\.user\)\ \{/,
                    replace: "if (blacket?.user) {"
                },
                {
                    match: /\} else setTimeout\(reset\, 1\)\;/,
                    replace: "BPP.Dispatcher.dispatch(\"@blacket/stats\");} else setTimeout(reset, 1);"
                }
            ]
        },
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
                    match: /blacket\.news \= data.news\;/,
                    replace: `blacket.news = data.news;$self.fireBlacketLoad();`
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
        blacket().socket.on("chat", (data) => {
            if (Object.values(DEVS).some(dev => dev.id === data.user.id)) data.user.badges.push("BPP Contributor");

            BPP.Plugins.plugins["Internals"].hooks.chat.hooks.receiveMessageSocket(data);
        });

        if (location.pathname === "/stats" || location.pathname === "/stats/") {
            blacket().requests.get("/worker/user", (data) => {
                if (data.error) throw data;
                blacket().setUser(data.user);
            });
        }

        // @ts-expect-error
        unsafeWindow.spitroast = spitroast;
    },
    stop() {
        console.log("uh oh");
    },
    page: "*",
    required: true,
    requires: () => {
        if (location.pathname === "/stats" || location.pathname === "/stats/") return ["@blacket/stats"];
    },
    fireBlacketLoad() {
        eventManager.dispatch("BlacketReady");

        spitroast.instead("get", blacket().requests, (args, get) => {
            if (!args[0]?.includes("/worker/badges") && !args[0]?.includes("/worker/user")) return get(...args);

            get(args[0], (data) => {
                switch (args[0]) {
                    case "/worker/badges": {
                        return args[1]({
                            error: false,
                            badges: {
                                ...data.badges,
                                ...customBadges
                            }
                        });
                    }
                    case "/worker/user": {
                        return args[1]({
                            error: false,
                            user: {
                                ...data.user,
                                badges: [
                                    ...data.user.badges,
                                    Object.values(DEVS).some(dev => dev.id === data.user.id) ? "BPP Contributor" : null
                                ]
                            }
                        });
                    }
                
                    default:
                        break;
                }
            });     
        });


    },
    hooks: {
        settings: {
            hooks: {},
            loaded() {
                eventManager.dispatch("SettingsLoaded");
            }
        },
        chat: {
            hooks: {}
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