export interface Article {
    title: string;
    source: {
        name: string | undefined;
    };
    url: string;
    description: string;
    publishedAt: string;
}