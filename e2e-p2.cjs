const { chromium } = require("playwright");
const OUT = "/home/admin/.openclaw/workspace/mathocrui/e2e-screenshots";
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });

  const tests = [
    ["upload-default", "components-imageupload--default"],
    ["upload-error", "components-imageupload--error"],
    ["preview-default", "components-imagepreview--default"],
    ["preview-error", "components-imagepreview--error-state"],
    ["pagination-many", "components-imagepagination--many-pages"],
    ["pagination-default", "components-imagepagination--default"],
  ];

  for (const [name, id] of tests) {
    console.log(`📸 ${name}`);
    await p.goto(`http://localhost:6006/?path=/story/${id}`, { waitUntil: "networkidle", timeout: 15000 });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `${OUT}/p2-${name}.png` });
  }
  await b.close();
  console.log("Done - 6 screenshots");
})();
