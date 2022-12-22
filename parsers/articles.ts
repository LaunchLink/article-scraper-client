import { JSONValue } from "../services/fetcher";

interface Article {
  url: string;
  title: string;
  author: string;
  synthExtract: string;
  tags: string[];
  publication: {
    name: string;
    domain: string;
  };
  clientMentions: {}[];
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
      clientMentions: d.clientMentions,
      createdAt: new Date(d.createdAt),
    };
  });
};
