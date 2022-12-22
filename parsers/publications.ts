interface Feed {
  url: string;
  publicationId: string;
}

interface Publication {
  domain: string;
  name: string;
  feeds: Feed[];
}

interface ValidatedFeed {
  message?: string;
  error?: string;
  url: string;
}

type PublicationCreate = Publication & { validatedFeeds: ValidatedFeed[] };

interface PublicationCreateError {
  message: string;
  feeds: {
    url: string;
    message?: string;
    error?: string;
  };
}

export interface CreatePublicationParams {
  name: string;
  domain: string;
  feeds: string[];
}

export function isCreatePublicationError(
  publication: PublicationCreate | PublicationCreateError
): publication is PublicationCreateError {
  return "message" in publication;
}

export const parsePublications = (data: any): Publication[] => {
  return data.map((d: any) => ({
    domain: d.domain,
    name: d.name,
    feeds: d.feeds.map((f: any) => ({
      url: f.url,
      publicationId: f.publicationId,
    })),
  }));
};

export const parseCreatePublication = (
  data: any
): PublicationCreate | PublicationCreateError => {
  return data;
};

export const parseUpdatePublication = (
  data: any
): PublicationCreate | PublicationCreateError => {
  return data;
};
