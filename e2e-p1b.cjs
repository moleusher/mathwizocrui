const { chromium } = require("playwright");
const OUT = "/home/admin/.openclaw/workspace/mathocrui/e2e-screenshots";
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  await p.goto("http://localhost:6006/?path=/story/components-statusbadge--all-statuses", { waitUntil: "networkidle", timeout: 15000 });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}/p1-statusbadge-all.png` });
  await b.close();
  console.log("Done");
})();
