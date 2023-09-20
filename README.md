<div align="center">
  <h1>Blacket++</h1>
  <h3>the best client mod for blacket.</h3>
  <p>built with ❤️ by zastix & death</p>
</div>
<br>

## Installation
1. Clone the repository & enter the repository directory.
2. Install dependencies with npm.
3. Run the build script (`npm run build`).
4. Enter the /dist folder, find the `BPP.user.js` file, and paste it into Tampermonkey.
5. Run the Tampermonkey and enjoy!
<br>

## Developer Documentation
### Plugins
Plugins are based off Vencord's "borrowed" api, so here's a quick example.
```ts
import blacket from "@api/blacket";
import { DEVS } from "@utils/constants";
import definePlugin from "@utils/plugins";

export default () => definePlugin({
    name: "Example Plugin",
    authors: [DEVS.thonk],
    description: "This is a plugin made for educational purposes only.",
    page: "*",
    patches: [ 
        { 
            file: "/lib/js/chat.js", 
            replacement: [ 
                { 
                    match: /localStorage\.getItem\(\"lastRulesVersion\"\) \!\= rulesVersion/, 
                    replace: "false" 
                }
            ]
        }
    ],
    commands: [
        {
            name: "Test",
            execute(...args) {
                blacket().socket.emit("chat", "Testing");
            },
            description: "Testing command."
        }
    ],
    start() {
        console.log('Started Plugin.');
    },
    stop() {
        console.log('Stopped Plugin');
    }
});
```

So, there's a LOT going on. Here are some comments to help guide you:
```ts
import blacket from "@api/blacket"; // gets the global blacket object. must be initiated as a function, so instead of blacket.socket, you'd use blacket().socket.
import { DEVS } from "@utils/constants"; // gets the devs, you'll probably be using import { CONTRIBUTORS }, but oh well.
import definePlugin from "@utils/plugins";

export default () => definePlugin({
    name: "Example Plugin", // plugin name
    authors: [DEVS.thonk], // array of authors/devs from the constants
    description: "This is a plugin made for educational purposes only.", // plugin description
    page: ["*"], // pages the plugin is run on.
    patches: [ // edits the code before it loads.
        { 
            file: "/lib/js/chat.js", // file path to patch
            replacement: [ // replacement array
                // haha! i shall not follow these rules! 
                { 
                    match: /localStorage\.getItem\(\"lastRulesVersion\"\) \!\= rulesVersion/, // content to look for
                    replace: "false" // content to replace with
                }
            ]
        }
    ],
    commands: [ // plugin chat commands, simple enough, no docs needed
        {
            name: "Test",
            execute(...args) {
                blacket().socket.emit("chat", "Testing");
            },
            description: "Testing command."
        }
    ],
    start() { // plugin is actually turned on in settings
        console.log('Started Plugin.');
    },
    stop() { // plugin is actually turned off in settings
        console.log('Stopped Plugin');
    }
});
```
Simple enough (I hope).
### Themes
no docs yet :/
