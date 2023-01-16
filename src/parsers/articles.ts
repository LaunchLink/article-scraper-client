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

export const parseArticles = (data: any): Article[] => {
  return data.map((d: any) => {
    return {
      url: d.url,
      title: d.title,
      author: d.author,
      synthExtract: d.synthExtract,
      tags: d.tags,
      publication: d.publication,
      createdAt: new Date(d.createdAt),
    };
  });
};

export interface SuggestedCommentOutput {
  text: string;
}

export const parseSuggestedComment = (data: any): SuggestedCommentOutput => {
  return data as SuggestedCommentOutput;
};
