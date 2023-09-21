import blacket from "@api/blacket";
import { DEVS } from "@utils/constants";
import definePlugin from "@utils/plugins";

export default () => definePlugin({
    name: "Testing",
    authors: [DEVS.zastix],
    description: "A testing plugin...",
    page: "*",
    settings: [
        {
            name: "test",
            type: 1,
            default: false,
            description: "Testing setting."
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
    ]
});