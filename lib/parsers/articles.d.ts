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
    createdAt: Date;
}
export declare const parseArticles: (data: any) => Article[];
export interface SuggestedCommentOutput {
    text: string;
}
export declare const parseSuggestedComment: (data: any) => SuggestedCommentOutput;
