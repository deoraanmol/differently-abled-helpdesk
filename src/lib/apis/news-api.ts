import { Article } from "@/types/Article";

export async function fetchLatestAccessibilityArticles() {
    const appKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=disability%20OR%20accessibility&language=en&sortBy=publishedAt&pageSize=5&apiKey=${appKey}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch articles');

    const data = await res.json();
    return data.articles.map((article: Article) => ({
        title: article.title,
        source: article.source.name,
        url: article.url,
        publishedAt: article.publishedAt,
        description: article.description,
    }));
}
