const { chromium } = require("playwright");
const OUT = "/home/admin/.openclaw/workspace/mathocrui/e2e-screenshots";
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  for (const [name, id] of [
    ["pipeline-all", "components-pipelinestagecard--all-stages"],
    ["pipeline-running", "components-pipelinestagecard--running"],
    ["legend-default", "components-blocklegend--default"],
    ["overlay-default", "components-blockoverlay--default"],
    ["topbar-default", "components-topbar--default"],
    ["layout-default", "components-applayout--default"],
  ]) {
    console.log(`📸 ${name}`);
    await p.goto(`http://localhost:6006/?path=/story/${id}`, { waitUntil: "networkidle", timeout: 15000 });
    await p.waitForTimeout(1200);
    await p.screenshot({ path: `${OUT}/p4-p5-${name}.png` });
  }
  await b.close();
  console.log("Done - 6 screenshots");
})();
