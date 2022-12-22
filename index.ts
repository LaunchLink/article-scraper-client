import { parseArticles } from "./parsers/articles";
import {
  CreateClientParams,
  parseClient,
  parseClients,
} from "./parsers/clients";
import {
  CreatePublicationParams,
  parseCreatePublication,
  parsePublications,
  parseUpdatePublication,
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
      throw new Error("No API key provided.");
    } else if (!provisionalApiKey.startsWith("PANOPTICON")) {
      throw new Error(
        "Are you sure this is a valid API key? All API keys should start with PANOPTICON_"
      );
    } else {
      this.apiKey = provisionalApiKey;
    }
  }

  public async getArticles() {
    return await fetcher("/articles", "GET", parseArticles, this.apiKey);
  }

  public async getClients() {
    return await fetcher("/client", "GET", parseClients, this.apiKey);
  }

  public async createClient(data: CreateClientParams) {
    return await fetcher("/client/create", "POST", parseClient, this.apiKey, {
      body: JSON.stringify(data),
    });
  }

  public async updateClient(id: string, data: Partial<CreateClientParams>) {
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

  public async getPublications() {
    return await fetcher("/publication", "GET", parsePublications, this.apiKey);
  }

  public async createPublication(data: CreatePublicationParams) {
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
  ) {
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
