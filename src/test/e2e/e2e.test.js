import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(60000);
describe(('manual test'), () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8888';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
  test('Open page', async () => {
    await page.goto(baseUrl);
  });
  test('click to reveal', async () => {
    await page.goto(baseUrl);
    const button = await page.$('button');
    button.click().catch((e) => e);
    await page.waitForSelector('.popover-container');
  });
});
