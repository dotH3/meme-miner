import { Scraper } from "@the-convocation/twitter-scraper";
import { getMediaUrl, hasMedia } from "./src/finder";
import { getTweetById, saveMediaByUrl, saveTweet } from "./src/storage";
import { uploadReel } from "./src/uploader";

const userNames = ['memes', 'JMilei', 'NoContextCrap'];
const index = 2

const scraper = new Scraper();

const getTweets = async (username: string) => {
    console.log("[ACCOUNT] >", username);
    const tweets = await scraper.getTweets(username, 20);
    return tweets;
}

const list = await getTweets(userNames[index])

for await (const tweet of list) {
    if (hasMedia(tweet) === false) continue;
    if (getTweetById(tweet.id as string)) continue;
    // 
    const { videos } = getMediaUrl(tweet);
    // const url = videos[0];

    videos.forEach(async (url) => {
    const path = await saveMediaByUrl(url)

    // await uploadReel(path);

    await saveTweet(tweet);

    console.log(path);
    });
}