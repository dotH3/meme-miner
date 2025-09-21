import { Scraper } from "@the-convocation/twitter-scraper";
import { getMediaUrl, hasMedia } from "./finder";
import { getTweetById, saveMediaByUrl, saveTweet } from "./storage"
import cron from 'node-cron'
import { getDate } from "./helper";

const userNames = ['JMilei', 'NoContextCrap'];
const index = 1;

const scraper = new Scraper();

const getTweets = async (username: string) => {
    console.log(`[${getDate()}] >`, username);
    const tweets = await scraper.getTweets(username, 20);
    return tweets;
}

const run = async () => {
    const list = await getTweets(userNames[index]);
    let counter = 0


    for await (const tweet of list) {
        if (hasMedia(tweet) === false) continue;
        if (getTweetById(tweet.id as string)) continue;
        const { videos } = getMediaUrl(tweet);


        videos.forEach(async (url) => {
            const path = await saveMediaByUrl(url)
            // await uploadReel(path);

            await saveTweet(tweet);
        });

        counter++;
    }
    console.log(`[${getDate()}] > Saved ${counter} tweets from ${userNames[index]}`);
}
run()

cron.schedule('0 0 * * *', async () => {
    await run()
})