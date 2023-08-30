import definePlugin from "@utils/plugins";
import { alertUtil } from "@api/util";

export default() => definePlugin({
    name: "Test",
    description: "weee :3",
    authors: [
        {
            name: "zastix",
            id: "0"
        }
    ],
    page: "*",
    start: () => {
        alertUtil("Blooket", "You got hacked!")
    },
    stop: () => {
        alertUtil("Blooket", "You got unhacked!")
    }
});
