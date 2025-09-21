import { Scraper } from "@the-convocation/twitter-scraper";
import { getMediaUrl, hasMedia } from "./handlers/finder";
import { getTweetById, saveMediaByUrl, saveTweet } from "./handlers/storage"
import cron from 'node-cron'
import { getDate } from "./handlers/helper";
import { openInstagram, shareReel } from "./handlers/instagram";

const userNames = ['JMilei', 'NoContextCrap'];
const index = 1;

const scraper = new Scraper();


const getTweets = async (username: string) => {
    console.log(`[${getDate()}] >`, username);
    const tweets = await scraper.getTweets(username, 10);
    return tweets;
}

const run = async () => {
    const list = await getTweets(userNames[index]);
    let counter = 0


    for await (const tweet of list) {
        if (hasMedia(tweet) === false) continue;
        if (getTweetById(tweet.id as string)) continue;
        const { videos } = getMediaUrl(tweet);

        // const url = videos[0]

        for (const url of videos) {
            const path = await saveMediaByUrl(url)

            await saveTweet(tweet);
            // console.log(path)
            // return
            await shareReel(path, 'hello world')
        }

        counter++;
    }
    console.log(`[${getDate()}] > Saved ${counter} tweets from ${userNames[index]}`);

}


// openInstagram()
run()

// cron.schedule('*/10 * * * *', async () => {
//     await run()
// })