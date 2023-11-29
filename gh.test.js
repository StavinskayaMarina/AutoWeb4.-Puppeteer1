let page;

beforeEach(async () => {
  page = await browser.newPage();
});
afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team", { timeout: 9000 });
  });

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"), {
      timeout: 9000,
    });
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent, {
      timeout: 9000,
    });
    expect(actual).toContain("Get started with Team");
  });
});

describe("Github about test", () => {
  jest.setTimeout(60000);

  beforeEach(async () => {
    await page.goto("https://github.com/about");
  });

  test("About title content", async () => {
    const selLink = "h1.h1-mktg.mb-3";
    await page.waitForSelector(selLink);
    const actual = await page.$eval(selLink, (link) => link.textContent);
    expect(actual).toContain("Let's build from here");
  });
});

describe("Github enterprise test", () => {
  jest.setTimeout(60000);

  beforeEach(async () => {
    await page.goto("https://github.com/enterprise");
  });

  test("Enterprise title content", async () => {
    const selLink = "#hero-section-brand-heading";
    await page.waitForSelector(selLink);
    const actual = await page.$eval(selLink, (link) => link.textContent);
    expect(actual).toContain("The AI-powered");
  });
});

describe("Github pricing test", () => {
  jest.setTimeout(60000);

  beforeEach(async () => {
    await page.goto("https://github.com/pricing");
  });

  test("Pricing title content", async () => {
    const selLink = "h2.h6-mktg.mb-3";
    await page.waitForSelector(selLink);
    const actual = await page.$eval(selLink, (link) => link.textContent);
    expect(actual).toContain("How often do you want to pay?");
  });
});
