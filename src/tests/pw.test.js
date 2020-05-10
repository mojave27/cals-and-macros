import playwright, { chromium } from 'playwright'
let screenShotPath = `${process.cwd()}/src/tests/screenshots`


it('simple playwright test', async () => {
  const url = 'http://localhost:3001/form/'
  const browserList = ['chromium', 'firefox', 'webkit']

  browserList.forEach(async browserType => {
    let fullPath = `${screenShotPath}/example-${browserType}.png`
    console.log(`full path: ${fullPath}`)
    const browser = await playwright[browserType].launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(url)
    await page.screenshot({
      path: `${fullPath}`
    })
    await browser.close()
  })
})

// const { firefox } = require('playwright');

it('test 2', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.example.com/');
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    }
  })
  expect(dimensions.width).toEqual(800)
  expect(dimensions.height).toEqual(600)
  await browser.close();
})