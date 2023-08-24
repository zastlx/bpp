// vite.config.ts
import { defineConfig } from "file:///C:/Users/zasti/Documents/projects/bbb/bbb/node_modules/.pnpm/vite@4.4.9_terser@5.19.2/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/zasti/Documents/projects/bbb/bbb/node_modules/.pnpm/@vitejs+plugin-react@4.0.4_vite@4.4.9/node_modules/@vitejs/plugin-react/dist/index.mjs";
import cssInjectedByJsPlugin from "file:///C:/Users/zasti/Documents/projects/bbb/bbb/node_modules/.pnpm/vite-plugin-css-injected-by-js@3.3.0_vite@4.4.9/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin()
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
        manualChunks: void 0,
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
      module: true
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx6YXN0aVxcXFxEb2N1bWVudHNcXFxccHJvamVjdHNcXFxcYmJiXFxcXGJiYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcemFzdGlcXFxcRG9jdW1lbnRzXFxcXHByb2plY3RzXFxcXGJiYlxcXFxiYmJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3phc3RpL0RvY3VtZW50cy9wcm9qZWN0cy9iYmIvYmJiL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcclxuaW1wb3J0IGNzc0luamVjdGVkQnlKc1BsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tY3NzLWluamVjdGVkLWJ5LWpzXCJcclxuaW1wb3J0IHVzZXJzY3JpcHRDb21waWxlIGZyb20gXCIuL3VzZXJzY3JpcHQvcGx1Z2luXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHJlYWN0KCksIGNzc0luamVjdGVkQnlKc1BsdWdpbigpXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgIFwiQGFwaVwiOiBcIi9zcmMvYXBpXCIsXHJcbiAgICAgICAgICAgIFwiQGNvbXBvbmVudHNcIjogXCIvc3JjL2NvbXBvbmVudHNcIixcclxuICAgICAgICAgICAgXCJAdXRpbHNcIjogXCIvc3JjL3V0aWxzXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBzb3VyY2VtYXA6IGZhbHNlLFxyXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAgICAgICBtYW51YWxDaHVua3M6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcImNvbXBpbGVkLmpzXCIsXHJcbiAgICAgICAgICAgICAgICBpbmxpbmVEeW5hbWljSW1wb3J0czogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtaW5pZnk6IFwidGVyc2VyXCIsXHJcbiAgICAgICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICAgICAgICBmb3JtYXQ6IHtcclxuICAgICAgICAgICAgICAgIGNvbW1lbnRzOiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAgICAgICAgc2VxdWVuY2VzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYm9vbGVhbnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBsb29wczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRvcGxldmVsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdW5zYWZlOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1vZHVsZTogdHJ1ZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlQsU0FBUSxvQkFBbUI7QUFDdFYsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sMkJBQTJCO0FBR2xDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUFHLHNCQUFzQjtBQUFBLEVBQ25DO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxRQUFRO0FBQUEsTUFDUixlQUFlO0FBQUEsTUFDZixVQUFVO0FBQUEsSUFDZDtBQUFBLEVBQ0o7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNYLFFBQVE7QUFBQSxRQUNKLGNBQWM7QUFBQSxRQUNkLGdCQUFnQjtBQUFBLFFBQ2hCLHNCQUFzQjtBQUFBLE1BQzFCO0FBQUEsSUFDSjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ1gsUUFBUTtBQUFBLFFBQ0osVUFBVTtBQUFBLE1BQ2Q7QUFBQSxNQUNBLFVBQVU7QUFBQSxRQUNOLFdBQVc7QUFBQSxRQUNYLFVBQVU7QUFBQSxRQUNWLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxRQUNWLFFBQVE7QUFBQSxNQUNaO0FBQUEsTUFDQSxRQUFRO0FBQUEsSUFDWjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
