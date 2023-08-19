import definePlugin from "@utils/plugins";

export default () => definePlugin({
    name: "Testing",
    description: "e",
    authors: [
        {
            name: "zastix",
            id: "0"
        }
    ],
    start() {
    },
    stop() {
        console.log("CODEW STOP");
    }
});