// backend/puppeteer/extractWebsiteData.js
const puppeteer = require("puppeteer");

async function extractWebsiteData(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const data = await page.evaluate(() => {
    const animations = Array.from(document.querySelectorAll("*")).map(el => ({
      tag: el.tagName,
      class: el.className,
      id: el.id,
      animations: el.getAnimations().map(anim => ({
        name: anim.animationName,
        duration: anim.effect.getTiming().duration,
        easing: anim.effect.getTiming().easing,
        fill: anim.effect.getTiming().fill,
      })),
      styles: Object.fromEntries(
        Array.from(window.getComputedStyle(el)).map(prop => [prop, window.getComputedStyle(el).getPropertyValue(prop)])
      ),
    }));

    return {
      url: location.href,
      title: document.title,
      animations,
      fullHTML: document.documentElement.outerHTML,
    };
  });

  await browser.close();
  return data;
}

module.exports = { extractWebsiteData };
