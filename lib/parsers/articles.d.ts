export interface ClientMention {
    sentence: string;
    client: {
        name: string;
        id: string;
    };
}
export interface Article {
    url: string;
    title: string;
    author: string;
    synthExtract: string;
    tags: string[];
    publication: {
        name: string;
        domain: string;
    };
    clientMentions: ClientMention[];
    createdAt: Date;
}
export declare const parseArticles: (data: any) => Article[];
