import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        process.env.NODE_ENV === "production" &&
            replace({
                "process.env.NODE_ENV": '"production"',
                preventAssignment: true,
            }),
    ],
    build: {
        sourcemap: true,
        minify: false,
        outDir: "../db/project/static/app/js",
        emptyOutDir: false,
        copyPublicDir: false,
        lib: {
            entry: "src/main.jsx",
            formats: ["es"],
            fileName: "project",
        },
    },
    server: {
        proxy: {
            "^/.+.json$": "http://localhost:8000",
            "^/config.js$": "http://localhost:8000",
            "^/admin/.*$": "http://localhost:8000",
            "^/static/.*$": "http://localhost:8000",
            "^/media/.*$": "http://localhost:8000",
            "^/tiles/.*$": "http://localhost:8000",
        },
    },
});
