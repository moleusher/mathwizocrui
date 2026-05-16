const { chromium } = require("playwright");
const OUT = "/home/admin/.openclaw/workspace/mathocrui/e2e-screenshots";
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  for (const [name, id] of [
    ["card-complete", "components-questioncard--complete"],
    ["card-failed", "components-questioncard--failed"],
    ["list-with", "components-questionlist--with-questions"],
    ["list-empty", "components-questionlist--empty"],
    ["tabs-horizontal", "components-analysistabs--horizontal"],
    ["tabs-vertical", "components-analysistabs--vertical"],
  ]) {
    console.log(`📸 ${name}`);
    await p.goto(`http://localhost:6006/?path=/story/${id}`, { waitUntil: "networkidle", timeout: 15000 });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `${OUT}/p3-${name}.png` });
  }
  await b.close();
  console.log("Done - 6 screenshots");
})();
