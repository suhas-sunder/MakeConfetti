import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env = { ...process.env, ...env };

  const port = 3200;

  return defineConfig({
    server: {
      port,
      hmr: {
        protocol: "ws",
        host: "localhost",
      },
    },
    plugins: [
      // Include remix plugin only if not in test environment
      process.env.NODE_ENV === "test"
        ? null
        : remix({
            future: {
              v3_fetcherPersist: true,
              v3_relativeSplatPath: true,
              v3_throwAbortReason: true,
            },
            ignoredRouteFiles: ["**/*.css"], // Optionally ignore certain files
          }),
      tsconfigPaths(),
    ],
    base: "/", // Ensure base path is set correctly
    test: {
      globals: true,
      environment: "jsdom",
    },
    define: {
      'import.meta.env.MODE': JSON.stringify(process.env.MODE || 'development'),
      'import.meta.env.VITE_PORT': JSON.stringify(process.env.VITE_PORT || '3200'),
    },
  });
};
