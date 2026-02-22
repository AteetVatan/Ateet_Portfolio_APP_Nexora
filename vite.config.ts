import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// All static routes to prerender for SEO
const PRERENDER_ROUTES = [
  "/",
  "/about",
  "/projects",
  "/blog",
  "/contact",
  "/cv",
  "/services",
  "/masx-ai",
  "/masx-ai/case-study",
  "/ai-news",
  "/beyond-the-code",
  "/business-card",
];

async function getPrerenderPlugin(): Promise<PluginOption | false> {
  const vitePrerender = (await import("vite-plugin-prerender")).default;
  return vitePrerender({
    staticDir: path.resolve(__dirname, "dist"),
    routes: PRERENDER_ROUTES,
    renderer: new vitePrerender.PuppeteerRenderer({
      renderAfterDocumentEvent: "DOMContentLoaded",
      renderAfterTime: 3000,
      headless: true,
    }),
    postProcess(renderedRoute: any) {
      renderedRoute.html = renderedRoute.html
        .replace(/\s+/g, " ")
        .replace(/> </g, ">\n<");
      return renderedRoute;
    },
  });
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Only prerender in production builds
    mode === "production" && (await getPrerenderPlugin()),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
