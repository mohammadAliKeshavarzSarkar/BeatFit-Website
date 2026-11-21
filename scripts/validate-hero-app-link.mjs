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

  const imageIndex = markup.indexOf("bf-hero__sprinter");
  const linkIndex = markup.indexOf("bf-hero__app-link");
  const featuresIndex = markup.indexOf("bf-hero__features");
  const proofIndex = markup.indexOf("bf-hero__proof");

  assert.ok(imageIndex >= 0, "Hero athlete image is missing");
  assert.ok(linkIndex > imageIndex, "App link must render below the hero image");
  assert.ok(featuresIndex < linkIndex, "App link must render outside the visual composition");
  assert.ok(proofIndex > linkIndex, "App link must stay between the composition and proof rail");
  assert.match(markup, /href="https:\/\/app\.beatfit\.ir"/u, "App link destination is incorrect");
  assert.ok(markup.includes("ورود به اپ بیت‌فیت"), "Persian app-link label is missing");
  assert.match(markup, /bf-hero__app-link-icon/u, "App link icon is missing");

  console.log("Home hero app-link contract passed.");
} finally {
  await vite.close();
}
