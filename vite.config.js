import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => {
    return {
        server: {
            fs: {
                // Allow serving files outside of the root
                allow: ["../.."],
            },
        },
        optimizeDeps: { exclude: ["@babylonjs/havok"] },
        resolve: {
            alias: {
                babylonjs:
                    mode === "development"
                        ? "babylonjs/babylon.max"
                        : "babylonjs",
            },
        },
    };
});
