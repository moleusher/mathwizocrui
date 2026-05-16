const { chromium } = require("playwright");
const fs = require("fs");

const BASE = "http://localhost:6006";
const OUT = "/home/admin/.openclaw/workspace/mathocrui/e2e-screenshots";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Test MathButton primary
  console.log("📸 MathButton Primary...");
  await page.goto(`${BASE}/?path=/story/components-mathbutton--primary`, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/test-button-primary.png` });
  console.log("   ✅ done");

  // Test MathBadge all-variants
  console.log("📸 MathBadge All Variants...");
  await page.goto(`${BASE}/?path=/story/components-mathbadge--all-variants`, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/test-badge-all.png` });
  console.log("   ✅ done");

  // Test MathButton all variants
  console.log("📸 MathButton All Variants...");
  await page.goto(`${BASE}/?path=/story/components-mathbutton--all-variants`, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/test-button-all.png` });
  console.log("   ✅ done");

  await browser.close();
  console.log("Done!");
}
main().catch(e => { console.error(e.message); process.exit(1); });
