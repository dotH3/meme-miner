import { Tweet } from "@the-convocation/twitter-scraper";
import JSONdb from "simple-json-db";
import { randomUUID } from "./helper";
import fs from 'fs'
import axios from "axios";

const db = new JSONdb("./tweets.json", {});

const saveTweet = (tweetData: Tweet | any) => {
    const id = tweetData.id;
    if (!id || !tweetData) return;
    db.set(id, tweetData);
}

const getTweetById = (id: string): Tweet | undefined => {
    return db.get(id);
}

const getByUsername = (username: string): Tweet[] => {
    return Object.values(db.JSON()).filter((tweet: Tweet) => tweet.username === username);
}

const saveMediaByUrl = async (url: string) => {
    const res = await axios.get(url, { responseType: "stream" })
    const name = randomUUID()
    const ext = url.split(".").pop()?.split("?")[0] || "bin"
    const path = `./media/${name}.${ext}`

    const writer = fs.createWriteStream(path)
    res.data.pipe(writer)

    return path
}

export { saveTweet, getTweetById, getByUsername, saveMediaByUrl };