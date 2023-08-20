import definePlugin from "@utils/plugins";

export default() => definePlugin({
    name: "deathDesotrery744",
    description: "jew plugin",
    authors: [
        {
            name: "zastix",
            id: "0"
        }
    ],
    start() {
        console.log('i like jews')
    },
    stop() {
        console.log("no i dont");
    },
    page: "*",
});