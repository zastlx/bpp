import fs from 'fs';
import path from 'path';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default function userscriptPlugin() {
    return {
        name: 'userscript-plugin',
        async closeBundle() {
            const reactAppPath = path.resolve(__dirname, '../dist/compiled.js');
            const userscriptPath = path.resolve(__dirname, '../dist/bbb.user.js');

            const userscriptTemplate = fs.readFileSync(path.resolve(__dirname, 'template.txt'), 'utf-8');
            const reactAppCode = fs.readFileSync(reactAppPath, 'utf-8');
            const userscriptCode = userscriptTemplate.replace('{{code}}', reactAppCode);

            fs.unlinkSync(path.resolve(__dirname, '../dist/compiled.js'))
            fs.unlinkSync(path.resolve(__dirname, '../dist/index.html'))
            fs.writeFileSync(userscriptPath, userscriptCode);

            console.log('Userscript generated.');
        },
    };
}