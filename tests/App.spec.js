const { test, expect, chromium } = require("@playwright/test");

const user = require("../user.js");

test("Successful authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
  });
  const page = await browser.newPage("https://netology.ru/?modal=sign_in");
  await page.goto("https://netology.ru/?modal=sign_in");

  await page.fill('[placeholder="Email"]', user.email);
  await page.fill('[placeholder="Пароль"]', user.password);

  await page.click('[data-testid="login-submit-btn"]');

  await expect(page.locator("h2")).toContainText(["Моё обучение"]);
  await page.screenshot({ path: "screenshotSuccessful.png", fullPage: false });
  browser.close();
}, 60000);

test("Unsuccessful authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });
  const page = await browser.newPage("https://netology.ru/?modal=sign_in");
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', 'sebd@sdfs.com');
  await page.fill('[placeholder="Пароль"]', 'asvghr');
  await page.click('[data-testid="login-submit-btn"]');
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
  await page.screenshot({ path: "screenshotFailed.png", fullPage: false });
  await browser.close();
}, 5000);