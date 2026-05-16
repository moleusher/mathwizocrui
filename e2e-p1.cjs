const { chromium } = require("playwright");
const OUT = "/home/admin/.openclaw/workspace/mathocrui/e2e-screenshots";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  const stories = [
    ["EmptyState", "components-emptystate--no-results"],
    ["EmptyState", "components-emptystate--empty-upload"],
    ["EmptyState", "components-emptystate--error-state"],
  ];

  for (const [name, path] of stories) {
    console.log(`📸 ${name}/${path.split('--')[1]}...`);
    await page.goto(`http://localhost:6006/?path=/story/${path}`, { waitUntil: "networkidle", timeout: 15000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${OUT}/p1-${name.toLowerCase()}-${path.split('--')[1]}.png` });
  }
  await browser.close();
  console.log("Done!");
})();
