const puppeteer = require('puppeteer');
const { test, expect } = require('@jest/globals');

test('Results for Apple Search', async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('http://localhost:3000');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  const searchBoxSelector = '#__next > div.MuiBox-root.css-i9gxme > header > div > div.MuiBox-root.css-c36nl0 > div.css-1wkrlxi > div.MuiInputBase-root.MuiInputBase-colorPrimary.css-1dwe5ya > input';
  await page.type(searchBoxSelector, 'apple');
  await page.keyboard.press('Enter');

  // Look for an element with the text 'MacBook'
  const elementSelector = '#__next > div.MuiBox-root.css-vi387d > div > div > div:nth-child(1) > div > div > div > div.MuiBox-root.css-ush7lw > h6';
  await page.waitForSelector(elementSelector);
  
  // Get the text content of the element
  const elementText = await page.$eval(elementSelector, el => el.textContent);
  
  // Test that the text content is what you expect
  expect(elementText).toBe('Apple 2023 MacBook Pro Lapto...');

  await browser.close();
});