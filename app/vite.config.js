import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wq from "@wq/rollup-plugin";

const prod = process.env.NODE_ENV === "production";

function staticDeps() {
    return {
        resolveId(id) {
            if (id === "./data/config.js") {
                return {
                    id: prod
                        ? "./data/config.js"
                        : "/config.js",
                    external: true,
                };
            }
        },
        enforce: "pre",
    };
}

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: { exclude: ["@mui/material/utils"] },
    plugins: [
        react(),
        staticDeps(),
        wq(prod ? null : { urlBase: "/static/app/js" }),
    ],
    build: {
        sourcemap: true,
        minify: false,
        outDir: "../db/project/static/app/js",
        emptyOutDir: false,
        copyPublicDir: false,
        rollupOptions: { makeAbsoluteExternalsRelative: false },
        lib: {
            entry: "src/index.js",
            formats: ["es"],
            fileName: "project",
        },
    },
    server: {
        proxy: {
            "^/.+.json$": "http://localhost:8000",
            "^/config.js$": "http://localhost:8000",
            "^/static/.+$": "http://localhost:8000",
        },
    },
});
