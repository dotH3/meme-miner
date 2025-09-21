import { Tweet } from "@the-convocation/twitter-scraper";

const getMediaUrl = (tweet: Tweet) => {
    const videos: string[] = [];
    const images: string[] = [];

    tweet?.videos?.forEach((video) => {
        const url = video?.url;
        if (!url) return;
        videos.push(url);
    });

    tweet?.photos?.forEach((photo) => {
        const url = photo?.url;
        if (!url) return;
        images.push(url);
    });

    return { videos, images };
}

const hasMedia = (tweet: Tweet) => {
    const { videos, images } = getMediaUrl(tweet);
    return videos.length > 0 || images.length > 0;
}

export { getMediaUrl, hasMedia };