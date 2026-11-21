import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const vite = await createServer({
  appType: "custom",
  server: { middlewareMode: true },
  ssr: { noExternal: ["gsap"] },
});

try {
  const { Hero } = await vite.ssrLoadModule("/src/components/Hero.tsx");
  const markup = renderToStaticMarkup(React.createElement(Hero));

  assert.ok(markup.includes("bf-hero__sprinter"), "Hero athlete image is missing");
  assert.ok(markup.includes("bf-hero__proof"), "Hero proof rail is missing");
  assert.ok(!markup.includes("bf-hero__app-link"), "Hero app link must be removed");
  assert.ok(!markup.includes("ورود به بیت‌فیت"), "Hero must not show the app-entry label");

  console.log("Home hero no-app-link contract passed.");
} finally {
  await vite.close();
}
