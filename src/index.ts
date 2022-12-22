import { Article, parseArticles } from "./parsers/articles";
import {
  Client,
  CreateClientParams,
  parseClient,
  parseClients,
} from "./parsers/clients";
import {
  CreatePublicationParams,
  parseCreatePublication,
  parsePublications,
  parseUpdatePublication,
  Publication,
  PublicationCreate,
  PublicationCreateError,
} from "./parsers/publications";
import { fetcher } from "./services/fetcher";

interface PanopticonClientOptions {
  panopticonApiKey: string;
}

export class PanopticonClient {
  private apiKey: string;

  constructor(options: Partial<PanopticonClientOptions> = {}) {
    const provisionalApiKey =
      options.panopticonApiKey || process.env.PANOPTICON_API_KEY;
    if (!provisionalApiKey) {
      throw new Error(
        "No API key provided. Please set the PANOPTICON_API_KEY in your .env file or pass one to this constructor."
      );
    } else if (!provisionalApiKey.startsWith("PANOPTICON")) {
      throw new Error(
        "Are you sure this is a valid API key? All API keys should start with PANOPTICON_"
      );
    } else {
      this.apiKey = provisionalApiKey;
    }
  }

  public async getArticles(): Promise<Article[]> {
    return await fetcher("/articles", "GET", parseArticles, this.apiKey);
  }

  public async getClients(): Promise<Client[]> {
    return await fetcher("/client", "GET", parseClients, this.apiKey);
  }

  public async createClient(data: CreateClientParams): Promise<Client> {
    return await fetcher("/client/create", "POST", parseClient, this.apiKey, {
      body: JSON.stringify(data),
    });
  }

  public async updateClient(
    id: string,
    data: Partial<CreateClientParams>
  ): Promise<Client> {
    return await fetcher(
      `/client/update/${id}`,
      "PATCH",
      parseClient,
      this.apiKey,
      {
        body: JSON.stringify(data),
      }
    );
  }

  public async getPublications(): Promise<Publication[]> {
    return await fetcher("/publication", "GET", parsePublications, this.apiKey);
  }

  public async createPublication(
    data: CreatePublicationParams
  ): Promise<PublicationCreate | PublicationCreateError> {
    return await fetcher(
      "/publication/create",
      "POST",
      parseCreatePublication,
      this.apiKey,
      {
        body: JSON.stringify(data),
      }
    );
  }

  public async updatePublication(
    domain: string,
    data: Partial<CreatePublicationParams>
  ): Promise<PublicationCreate | PublicationCreateError> {
    return await fetcher(
      `/publication/update/${domain}`,
      "PATCH",
      parseUpdatePublication,
      this.apiKey,
      {
        body: JSON.stringify(data),
      }
    );
  }
}
