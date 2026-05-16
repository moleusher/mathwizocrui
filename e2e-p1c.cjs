const { chromium } = require("playwright");
const OUT = "/home/admin/.openclaw/workspace/mathocrui/e2e-screenshots";
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });

  for (const [name, id] of [["quadratic", "components-markdownviewer--quadratic-formula"],["simple", "components-markdownviewer--simple-text"],["code", "components-markdownviewer--code-block"]]) {
    console.log(`📸 MarkdownViewer/${name}`);
    await p.goto(`http://localhost:6006/?path=/story/${id}`, { waitUntil: "networkidle", timeout: 15000 });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `${OUT}/p1-markdown-${name}.png` });
  }
  await b.close();
  console.log("Done");
})();
