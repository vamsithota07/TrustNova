import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "portfolio");

async function capture(url, outfile, { waitMs = 2000, ready } = {}) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  if (ready) {
    await page.waitForSelector(ready, { timeout: 60000 });
  }
  await page.waitForTimeout(waitMs);
  await page.screenshot({ path: outfile, type: "png" });
  await browser.close();
  console.log("saved", outfile);
}

await capture("http://localhost:5173/", path.join(outDir, "vistix-preview.png"), {
  waitMs: 2500,
});

await capture("http://localhost:3002/", path.join(outDir, "asmc-preview.png"), {
  ready: "#home",
  waitMs: 3500,
});
