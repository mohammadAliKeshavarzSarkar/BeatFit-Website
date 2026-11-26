import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { emitSeoFiles } from "./scripts/emit-seo-html";
import { homeDocument } from "./src/seo/marketing";
import { applySeoBlocks } from "./src/seo/html";
import { classifyAppPath, encodedPath, splitRequestUrl } from "./src/seo/routing";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function indexInsideDirectory(outDir: string, pathname: string): string | null {
  const bare = pathname.replace(/\/+$/, "") || "/";
  if (bare === "/") return null;
  const directory = path.join(outDir, bare.replace(/^\//, ""));
  const indexFile = path.join(directory, "index.html");
  if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory() || !fs.existsSync(indexFile)) {
    return null;
  }
  return `${bare}/index.html`;
}

function beatfitSeoPlugin(): Plugin {
  return {
    name: "beatfit-seo",
    transformIndexHtml(html) {
      return applySeoBlocks(html, homeDocument);
    },
    closeBundle() {
      emitSeoFiles(path.resolve(projectRoot, "dist"), projectRoot);
    },
    configurePreviewServer(server) {
      const outDir = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const { pathname, search } = splitRequestUrl(req.url);
        const directoryIndex = indexInsideDirectory(outDir, pathname);
        if (directoryIndex) {
          req.url = `${directoryIndex}${search}`;
          return next();
        }
        if (pathname.length > 1 && pathname.endsWith("/")) {
          const bare = pathname.replace(/\/+$/, "") || "/";
          res.statusCode = 301;
          res.setHeader("Location", `${encodedPath(bare)}${search}`);
          res.end();
          return;
        }
        if (path.extname(pathname)) return next();

        const route = classifyAppPath(pathname);
        if (route?.kind === "home") return next();
        if (route?.kind === "redirect") {
          res.statusCode = 301;
          res.setHeader("Location", `${route.url}${search}`);
          res.end();
          return;
        }
        if (route?.kind === "rewrite") {
          req.url = `${route.url}${search}`;
          return next();
        }

        const staticTarget = path.join(outDir, pathname.replace(/^\//, ""));
        if (!route && (fs.existsSync(staticTarget) || fs.existsSync(path.join(staticTarget, "index.html")))) {
          return next();
        }

        const notFound = path.join(outDir, "404.html");
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache");
        res.end(fs.readFileSync(notFound));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), beatfitSeoPlugin()],
  base: "/",
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("gsap")) return "gsap";
          if (id.includes("react-useanimations")) return "icons";
          if (
            id.includes("react-dom") ||
            id.includes("react-router") ||
            id.includes("@remix-run") ||
            id.includes(`${path.sep}react${path.sep}`)
          ) {
            return "react";
          }
        },
      },
    },
  },
});
