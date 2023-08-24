import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"
import userscriptCompile from "./userscript/plugin";

export default defineConfig({
    plugins: [
        react(), cssInjectedByJsPlugin()
    ],
    resolve: {
        alias: {
            "@api": "/src/api",
            "@components": "/src/components",
            "@utils": "/src/utils"
        }
    },
    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: undefined,
                entryFileNames: "compiled.js",
                inlineDynamicImports: true
            }
        },
        minify: "terser",
        terserOptions: {
            format: {
                comments: false
            },
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                toplevel: true,
                unsafe: true
            },
            module: true,
        }
    }
});