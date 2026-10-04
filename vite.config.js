import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],

    server: {
        port: 5173,

        proxy: {
            "/api": {
                target: "https://engineeringai-java-modernization.victoriouscliff-8a4c40e2.southindia.azurecontainerapps.io",
                changeOrigin: true
            }
        }
    }
});