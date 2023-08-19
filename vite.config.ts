import {
    defineConfig
} from "vite";
import react from "@vitejs/plugin-react";
import userscriptCompile from "./userscript/plugin";

export default defineConfig({
    plugins: [react(), userscriptCompile()],
    resolve: {
        alias: {
            "@api": "/src/api",
            "@components": "/src/components",
            "@utils": "/src/utils",
        }
    },
    build: {
        minify: true,
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: undefined,
                entryFileNames: "compiled.js",
                inlineDynamicImports: true
            },
        },
    },
});