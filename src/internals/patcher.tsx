import axios from "axios";
import {
    Logger
} from "../utils/logger";
import BPP from "@api/global";
import {
    FileIDKWHATTOCALLTHIS,
    PatchReplacement
} from "../utils/types";

export default () => {
    const logger = new Logger("Patcher")
    const scripts = Array.from(document.querySelectorAll("script"));
    const files: FileIDKWHATTOCALLTHIS[] = [];
    let errors = 0;
    const patches = BPP.Patches;

    scripts.forEach(async (script) => {
        try {
            logger.log(`Intercepting "${script.src}"`)
            const {
                data
            } = await axios.get(script.src);

            files.push({
                name: script.src.replace(location.origin, ""),
                data,
                element: script,
                patches: []
            });
            script.removeAttribute("src");
        } catch (error) {
            logger.error(`Error patching ${script.src}, ignoring file.`);
            errors++;
        }
    });

    function init() {
        if (scripts.length - errors !== files.length) return setTimeout(init, 1);

        for (const patch of patches) {
            const file = files.find((e) => e.name === patch.file);
            if (!file) continue;
            const oldData = file.data;
            
            file.patches.push(patch.plugin);
            if (Array.isArray(patch.replacement)) patch.replacement.forEach((replacement: PatchReplacement) => file.data = file.data.replaceAll(new RegExp(replacement.match, "g"), replacement.replace.replaceAll("$self", `BPP.Plugins["${patch.plugin}"]`)))
            else file.data = file.data.replaceAll(new RegExp(patch.replacement.match, "g"), patch.replacement.replace.replaceAll("$self", `BPP.Plugins["${patch.plugin}"]`));
            if (file.data === oldData) !Array.isArray(patch.replacement) ? logger.log(`Patch by ${patch.plugin} "${patch.replacement.match}" had no effect.`) : ">-<";
        }

        for (const file of files) {
            const url = URL.createObjectURL(new Blob([
                `// ${file.name}${file.patches.length >= 1 ? ` - Patched by ${file.patches.join(", ")}` : ``}\n`,
                file.data
            ]));
            file.element.src = url;
        }
        
    }

    init();
}