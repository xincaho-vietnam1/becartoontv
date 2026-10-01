import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
await mkdir('review',{recursive:true});const issues=[];
for(const mobile of [false,true]){
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage();page.on('pageerror',e=>issues.push(e.message));
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}scrollTo(0,0)});await page.waitForTimeout(400);
 await page.screenshot({path:`review/${mobile?'mobile':'desktop'}-full.png`,fullPage:true});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))issues.push(`Horizontal overflow: ${mobile}`);
 if(mobile){await page.getByRole('button',{name:'Menu +'}).click();await page.getByRole('link',{name:'Our friends',exact:true}).click();if(await page.getByRole('button',{name:'Menu +'}).getAttribute('aria-expanded')!=='false')issues.push('Mobile menu failed to close')}
 for(const name of ['Ben','Maya','Tiko','Zip','Rio']){
  await page.getByRole('button',{name:new RegExp(name),exact:false}).first().click();await page.locator('.cast-stage').screenshot({path:`review/${mobile?'mobile':'desktop'}-${name}.png`});
 }
 await page.getByRole('button',{name:/Rainbow Lagoon/}).click();if(!await page.locator('.world-story').innerText().then(t=>t.includes('paper boat')))issues.push('Destination selector failed');
 const video=page.locator('.video-card').first();if(await video.count()){await video.click();if(!await page.locator('dialog').evaluate(d=>d.open))issues.push('Video modal not open');await page.keyboard.press('Escape');if(await page.locator('dialog').evaluate(d=>d.open))issues.push('Video modal not closed')}
 if(await page.locator('.hero video').count())issues.push('Unexpected hero video');
 await context.close();
}
await browser.close();await writeFile('review/checks.json',JSON.stringify({issues,checked:['desktop/mobile overflow','five character selectors','destination selector','native player Escape close','reduced-motion video pause','mobile navigation']},null,2));
if(issues.length){console.error(issues);process.exitCode=1}else console.log('Browser interaction checks passed. Screenshots saved in review/.');
