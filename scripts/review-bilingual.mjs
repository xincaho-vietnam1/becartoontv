import {chromium} from '@playwright/test';import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
for(const width of [1440,390]){
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
 for(const lang of ['en','vi']){
  await page.getByRole('button',{name:lang.toUpperCase(),exact:true}).click();assert.equal(await page.locator('html').getAttribute('lang'),lang);
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)});await page.waitForTimeout(200);
  const text=await page.locator('body').innerText();assert(!/â[€†œ]|Ã[\x80-\xBF]|\uFFFD/.test(text),'Mojibake found');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'Horizontal overflow');
  await page.screenshot({path:`review/banner-${lang}-${width}.png`});await page.screenshot({path:`review/full-${lang}-${width}.png`,fullPage:true});
  if(lang==='vi'){assert(text.includes('Chuyện nhỏ xinh.'));await page.getByRole('button',{name:/Maya/}).click();assert((await page.locator('.cast-stage').textContent()).includes('Cô bạn đầy sáng tạo'));await page.getByRole('button',{name:/Vịnh Cầu Vồng/}).click();assert((await page.locator('.world-story').textContent()).includes('Chiếc thuyền giấy'));}
 }
 await page.reload();assert.equal(await page.locator('html').getAttribute('lang'),'vi');assert.equal(errors.length,0,errors.join(';'));await context.close();
}
await browser.close();console.log('EN/VI desktop and mobile, persisted selection, character/place translations and UTF-8 checks passed.');
