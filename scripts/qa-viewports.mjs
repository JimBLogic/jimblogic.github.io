import assert from "node:assert/strict";
import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";

const base=process.env.QA_ORIGIN ?? "http://127.0.0.1:9876";
const binary=process.env.CHROME_BIN ?? "/usr/bin/google-chrome";
const browser=await chromium.launch({headless:true,executablePath:binary,args:["--no-sandbox","--disable-dev-shm-usage"]});
const sizes=[
  {width:320,height:720,label:"small-mobile"},
  {width:390,height:844,label:"mobile"},
  {width:768,height:1024,label:"tablet"},
  {width:1440,height:900,label:"desktop"}
];
const dir="qa-artifacts";
await mkdir(dir,{recursive:true});
const records=[];
let failures=0;
try{
  for(const size of sizes){
    const context=await browser.newContext({viewport:{width:size.width,height:size.height},deviceScaleFactor:1,reducedMotion:"reduce"});
    const page=await context.newPage();
    const javascriptErrors=[];
    page.on("pageerror",error=>javascriptErrors.push(error.message));
    const home=await page.goto(base+"/",{waitUntil:"domcontentloaded",timeout:15000});
    assert.equal(home?.status(),200,size.label+": home");
    const links=page.locator(".live-project-link");
    assert.equal(await links.count(),3,size.label+": three top-level projects");
    const projects=await links.evaluateAll(nodes=>nodes.map(n=>({
      title:n.querySelector("strong")?.textContent?.trim(),
      href:n.getAttribute("href"),
      rect:(()=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}})()
    })));
    assert.deepEqual(projects.map(x=>x.title),["CyberDailyLog","Austrian Business Cycle Monitor","CyberSecurity 3D Lab"],size.label+": project order");
    assert.equal(projects[0].href,"/labs/cyberdailylog");
    assert.equal(projects[1].href,"/labs/austrian-monitor");
    assert.equal(projects[2].href,"https://lab.jimblogic.chatgpt.site/");
    if(size.width<=800){
      assert.ok(projects[1].rect.y>projects[0].rect.y,size.label+": stacked");
      assert.ok(projects[2].rect.y>projects[1].rect.y,size.label+": stacked");
    }else{
      assert.ok(Math.abs(projects[0].rect.y-projects[1].rect.y)<4,size.label+": desktop row");
      assert.ok(Math.abs(projects[1].rect.y-projects[2].rect.y)<4,size.label+": desktop row");
    }
    const details=await page.locator("#work .project-card h3").allTextContents();
    assert.ok(details.some(x=>x.includes("CyberDailyLog"))&&details.some(x=>x.includes("Austrian Business Cycle Monitor"))&&details.some(x=>x.includes("CyberSecurity 3D Lab")),size.label+": detailed project catalogue");
    const homeOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
    if(homeOverflow>2) {
      const offenders=await page.evaluate(()=>[...document.querySelectorAll("body *")].map(el=>{
        const r=el.getBoundingClientRect();
        return {tag:el.tagName,cls:String(el.className||"").slice(0,100),text:(el.textContent||"").trim().slice(0,65),left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width)};
      }).filter(el=>el.right>innerWidth+2 && el.width>0).sort((a,b)=>b.right-a.right).slice(0,18));
      console.error("HORIZONTAL_OVERFLOW_DIAGNOSTICS",size.label,JSON.stringify({pixels:homeOverflow,offenders}));
      await page.screenshot({path:`${dir}/home-overflow-${size.label}.png`,fullPage:true,animations:"disabled"});
    }
    assert.ok(homeOverflow<=2,size.label+": no home horizontal overflow "+homeOverflow);
    await page.screenshot({path:`${dir}/home-${size.label}.png`,fullPage:true,animations:"disabled"});
    const agents=await page.goto(base+"/agent-resources/",{waitUntil:"domcontentloaded"});
    assert.equal(agents?.status(),200,size.label+": agent page");
    assert.match(await page.title(),/Agent Resources/);
    assert.equal(await page.locator("article").count(),12,size.label+": 12 fully rendered sources");
    const sourceLinks=page.locator("article a[target=_blank]");
    assert.equal(await sourceLinks.count(),12);
    const agentOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
    assert.ok(agentOverflow<=2,size.label+": no agent page horizontal overflow "+agentOverflow);
    const contrast=await page.locator("article").first().evaluate(el=>({
      background:getComputedStyle(el).backgroundColor,color:getComputedStyle(el).color
    }));
    const catalogueResponse=await page.request.get(base+"/agent-resources/catalog.json");
    assert.equal(catalogueResponse.status(),200,"JSON 200");
    assert.match(catalogueResponse.headers()["content-type"]||"",/json/);
    const json=await catalogueResponse.json();
    assert.equal(json.sources.length,12,"JSON sources");
    assert.ok(!javascriptErrors.length,size.label+": console errors: "+javascriptErrors.join("; "));
    await page.screenshot({path:`${dir}/agents-${size.label}.png`,fullPage:true,animations:"disabled"});
    const metrics=await page.evaluate(()=>{
      const n=performance.getEntriesByType("navigation")[0];
      return {domContentLoadedMs:Math.round(n?.domContentLoadedEventEnd??0),resources:performance.getEntriesByType("resource").length};
    });
    records.push({viewport:size.label,width:size.width,homeOverflow,agentOverflow,projectNames:projects.map(x=>x.title),cards:json.sources.length,cardSampleStyles:contrast,metrics});
    console.log("PASS",size.label,JSON.stringify({homeOverflow,agentOverflow,projects:projects.length,resources:json.sources.length}));
    await context.close();
  }
  await writeFile(`${dir}/report.json`,JSON.stringify({status:"PASS",browser:"Chromium",testedAt:new Date().toISOString(),records},null,2)+"\n");
}catch(err){
  failures++;
  await writeFile(`${dir}/report.json`,JSON.stringify({status:"FAIL",failure:String(err),records},null,2)+"\n");
  throw err;
}finally{await browser.close()}
