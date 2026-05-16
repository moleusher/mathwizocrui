const { chromium } = require("playwright");
const fs = require("fs");

const BASE = "http://localhost:6006";
const OUT = "/home/admin/.openclaw/workspace/mathocrui/e2e-screenshots";
fs.mkdirSync(OUT, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // ── 1. Homepage ──
  console.log("📸 1/5: Storybook homepage...");
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: `${OUT}/01-homepage.png`,
    fullPage: false,
  });
  console.log("   ✅ homepage captured");

  // ── 2. MathButton stories ──
  console.log("📸 2/5: MathButton components...");
  const buttonStories = [
    { name: "primary", path: "components-mathbutton--primary" },
    { name: "secondary", path: "components-mathbutton--secondary" },
    { name: "outline", path: "components-mathbutton--outline" },
    { name: "destructive", path: "components-mathbutton--destructive" },
    { name: "loading", path: "components-mathbutton--loading" },
    { name: "all-variants", path: "components-mathbutton--all-variants" },
  ];
  for (const s of buttonStories) {
    await page.goto(`${BASE}/?path=/story/${s.path}`, {
      waitUntil: "networkidle",
      timeout: 15000,
    });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: `${OUT}/02-button-${s.name}.png`,
      fullPage: false,
    });
    console.log(`   ✅ MathButton/${s.name}`);
  }

  // ── 3. MathBadge stories ──
  console.log("📸 3/5: MathBadge components...");
  const badgeStories = [
    { name: "default", path: "components-mathbadge--default" },
    { name: "success", path: "components-mathbadge--success" },
    { name: "with-dot", path: "components-mathbadge--with-dot" },
    { name: "all-variants", path: "components-mathbadge--all-variants" },
  ];
  for (const s of badgeStories) {
    await page.goto(`${BASE}/?path=/story/${s.path}`, {
      waitUntil: "networkidle",
      timeout: 15000,
    });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: `${OUT}/03-badge-${s.name}.png`,
      fullPage: false,
    });
    console.log(`   ✅ MathBadge/${s.name}`);
  }

  // ── 4. FormulaRenderer stories ──
  console.log("📸 4/5: FormulaRenderer components...");
  const formulaStories = [
    { name: "inline", path: "components-formularenderer--inline-formula" },
    { name: "block", path: "components-formularenderer--block-formula" },
  ];
  for (const s of formulaStories) {
    await page.goto(`${BASE}/?path=/story/${s.path}`, {
      waitUntil: "networkidle",
      timeout: 15000,
    });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: `${OUT}/04-formula-${s.name}.png`,
      fullPage: false,
    });
    console.log(`   ✅ FormulaRenderer/${s.name}`);
  }

  // ── 5. Docs pages ──
  console.log("📸 5/5: Docs pages...");
  const docsPages = [
    { name: "mathbutton", path: "components-mathbutton" },
    { name: "mathbadge", path: "components-mathbadge" },
    { name: "formularenderer", path: "components-formularenderer" },
  ];
  for (const d of docsPages) {
    await page.goto(`${BASE}/?path=/docs/${d.path}`, {
      waitUntil: "networkidle",
      timeout: 15000,
    });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: `${OUT}/05-docs-${d.name}.png`,
      fullPage: false,
    });
    console.log(`   ✅ Docs/${d.name}`);
  }

  await browser.close();
  console.log(`\n🎉 Done! ${14} screenshots saved to ${OUT}/`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
