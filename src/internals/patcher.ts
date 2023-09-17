import axios from "axios";
import {
    Logger
} from "../utils/logger";
import BPP from "@api/global";

export default () => {
    const logger = new Logger("Patcher")
    const scripts = Array.from(document.querySelectorAll("script"));
    const files = BPP.Patcher.files;
    let errors = 0;
    const patches = BPP.Patcher.patches;

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
            const pluginReference = `BPP.Plugins.plugins["${patch.plugin}"]`;
        
            if (!file) continue
        
            if (!Array.isArray(patch.replacement)) {
                const matchRegex = new RegExp(patch.replacement.match, "g");
                const replaceString = patch.replacement.replace.replaceAll("$self", pluginReference);
                if (!matchRegex.test(file.data)) {
                    logger.log(`Patch by ${patch.plugin} "${matchRegex}" had no effect`);
                    continue;
                }

                file.data = file.data.replaceAll(matchRegex, replaceString);
            } else {
                for (const replacement of patch.replacement) {
                    const matchRegex = new RegExp(replacement.match, "g");
                    const replaceString = replacement.replace.replaceAll("$self", pluginReference);
                    if (!matchRegex.test(file.data)) {
                        logger.log(`Patch by ${patch.plugin} "${matchRegex}" had no effect`);
                        continue;
                    }

                    file.data = file.data.replaceAll(matchRegex, replaceString);
                }
            }
        
            file.patches.push(patch.plugin);
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