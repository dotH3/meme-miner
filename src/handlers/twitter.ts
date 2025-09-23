import { Scraper, Tweet } from "@the-convocation/twitter-scraper";
import { getDate } from "./helper";
import { getTweetById } from "./storage";
import { hasMedia } from "./finder";

const scraper = new Scraper();

export const getTweets = async (username: string, quantity) => {
    console.log(`[${getDate()}] >`, username);
    const tweets = await scraper.getTweets(username, quantity);
    return tweets;
}

export const getNewTweets = async (username: string, quantity) => {
    console.log(`[${getDate()}] >`, username);
    const tweetsAsync = await scraper.getTweets(username, quantity);
    const tweets: Tweet[] = [];
    for await (const t of tweetsAsync) {
        tweets.push(t);
    }
    const newList = tweets.filter((t: Tweet) => {
        const exist = getTweetById(t.id as string);
        const media = hasMedia(t);
        return !exist && media;
    });
    return newList;
}