import puppeteer from "puppeteer";

const INSTAGRAM_BASE_URL = "https://www.instagram.com";
const userDataDir = './chrome_profile'

const browser = await puppeteer.launch({
    headless: false,
    userDataDir: './profile'
});

const openInstagram = async () => {
    const page = await browser.newPage();
    await page.goto(INSTAGRAM_BASE_URL, { waitUntil: 'networkidle2' });
    return page
}

const shareReel = async (path: string, text: string) => {
    const page = await openInstagram()
    const botonNewPost = await page.$('svg[aria-label="New post"]');
    await botonNewPost?.click();
    // const botonPost = await page.$('svg[aria-label="Post"]');
    // await botonPost.click();

    // const selectButton = await page.waitForSelector('button._aswp._aswr._aswu._asw_._asx2', { visible: true });
    // await selectButton?.click();

    const selector = 'input[type="file"][accept*="image"],input[type="file"][accept*="video"]'
    await page.waitForSelector(selector, { visible: false })
    const fileInput = await page.$(selector);
    if (fileInput) {
        await fileInput.uploadFile(path);
    } else {
        throw new Error("File input element not found");
    }

    await delay(3000)

    // boton next
    const nextDiv = 'div.html-div.xdj266r.x14z9mp.xat24cr.x1lziwak.x9f619.x16ye13r.xjbqb8w.x78zum5.x15mokao.x1ga7v0g.x16uus16.xbiv7yw.xyamay9.xv54qhq.x1l90r2v.xf7dkkf.x1n2onr6.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.xl56j7k'

    await page.waitForSelector(nextDiv)
    await page.click(nextDiv)
    await delay(1000)
    await page.click(nextDiv)

    const shareDiv = 'div.html-div.xdj266r.x14z9mp.xat24cr.x1lziwak.x9f619.x16ye13r.xjbqb8w.x78zum5.x15mokao.x1ga7v0g.x16uus16.xbiv7yw.xyamay9.xv54qhq.x1l90r2v.xf7dkkf.x1n2onr6.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.xl56j7k'

    await page.waitForSelector(shareDiv)
    await page.click(shareDiv)

    // Esperar a que cargue
    // await page.waitForNetworkIdle({ idleTime: 1500, timeout: 60000 });
    await delay(22000)
    
    return true
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export { openInstagram, shareReel }