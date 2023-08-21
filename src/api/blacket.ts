import { Blacket } from "@utils/types";
import eventManager from "../internals/events";

eventManager.subscribe("BlacketReady", () => {
    
});
// @ts-ignore
export default (): Blacket => unsafeWindow.blacket;