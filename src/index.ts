import { getMediaUrl } from "./handlers/finder";
import { saveMediaByUrl, saveTweet } from "./handlers/storage"
import cron from 'node-cron'
import { getDate } from "./handlers/helper";
import { shareReel } from "./handlers/instagram";
import { startBot } from "./handlers/telegram";
import { getNewTweets } from "./handlers/twitter";
import path from "path"
import dotenv from 'dotenv';

dotenv.config();

const userNames = process.env.USER_NAMES?.split(',') || [];
const index = 2;

const quantity = 1

const bot = await startBot()
const CHAT_ID = process.env.CHAT_ID

const run = async () => {
    const list = await getNewTweets(userNames[index], quantity);
    let counter = 0

    for await (const tweet of list) {
        const { videos } = getMediaUrl(tweet);

        for (const url of videos) {
            const ruta = await saveMediaByUrl(url)

            await shareReel(ruta, 'hello world')
            await saveTweet(tweet);
            console.log("[TWEET SAVED] >", tweet.id);
            console.log(ruta)

            // const p = path.resolve(ruta)
            // await bot.sendVideo(
            //     CHAT_ID,
            //     p,
            //     { caption: `${ruta}` }
            // )
        }

        counter++;
    }
    console.log(`[${getDate()}] > Saved ${counter} tweets from ${userNames[index]}`);

}

run()

cron.schedule('*/10 * * * *', async () => {
    await run()
})