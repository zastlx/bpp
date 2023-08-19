import { Blacket } from "@utils/types";
import eventManager from "../internals/events";

let blacket: Blacket;
eventManager.subscribe("BlacketReady", () => {
    // @ts-expect-error
    blacket = unsafeWindow.blacket;
});

export default () => blacket;