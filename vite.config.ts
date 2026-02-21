import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import vitePrerender from "vite-plugin-prerender";

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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Only prerender in production builds
    mode === "production" &&
    vitePrerender({
      staticDir: path.resolve(__dirname, "dist"),
      routes: PRERENDER_ROUTES,
      renderer: new vitePrerender.PuppeteerRenderer({
        // Wait for React to hydrate before capturing
        renderAfterDocumentEvent: "DOMContentLoaded",
        // Give React time to render dynamic content
        renderAfterTime: 3000,
        headless: true,
      }),
      postProcess(renderedRoute: any) {
        // Trim excessive whitespace
        renderedRoute.html = renderedRoute.html
          .replace(/\s+/g, " ")
          .replace(/> </g, ">\n<");
        return renderedRoute;
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
