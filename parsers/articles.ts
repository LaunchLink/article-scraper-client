interface ClientMention {
  sentence: string;
  client: {
    name: string;
    id: string;
  };
}

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
  clientMentions: ClientMention[];
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
      clientMentions: d.clientMentions.map((clientMention: any) => ({
        sentence: clientMention.sentence,
        client: {
          name: clientMention.clientEntity.name,
          id: clientMention.clientEntity.id,
        },
      })),
      createdAt: new Date(d.createdAt),
    };
  });
};
