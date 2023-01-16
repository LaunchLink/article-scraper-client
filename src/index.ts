import {
  Article,
  parseArticles,
  parseSuggestedComment,
  SuggestedCommentOutput,
} from "./parsers/articles";
import {
  Client,
  CreateClientParams,
  IsNameUniqueOutput,
  parseClient,
  parseClients,
  parseIsNameUnique,
} from "./parsers/clients";
import {
  ClientCoverage,
  Coverage,
  parseClientCoverage,
  parseCoverage,
} from "./parsers/coverage";
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

interface GetArticlesOptions {
  take?: number;
  skip?: number;
  after?: Date;
}

interface SuggestCommentParams {
  articleUrl: string;
  clientDescription: string;
}

export default class PanopticonClient {
  private apiKey: string;

  /**
   * Creates a new Panopticon Client. Pass the API key here, or set it as PANOPTICON_API_KEY in your environment variables.
   * @param options
   */
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

  /**
   * Gets all articles sorted by date (newest first)
   * @param options
   * @returns A list of all articles in the system
   */
  public async getArticles(options: GetArticlesOptions): Promise<Article[]> {
    const queryString = new URLSearchParams();

    if (options.after) {
      queryString.append("after", options.after.toISOString());
    }

    if (options.skip) {
      queryString.append("skip", options.skip.toFixed());
    }

    if (options.take) {
      queryString.append("take", options.take.toFixed());
    }

    return await fetcher(
      `/articles?${queryString.toString()}`,
      "GET",
      parseArticles,
      this.apiKey
    );
  }

  /**
   * Generates a suggested comment for a client to the article.
   * @param params
   * @returns An object with the key `text` as the result
   */
  public async suggestArticleComment(
    params: SuggestCommentParams
  ): Promise<SuggestedCommentOutput> {
    return await fetcher(
      `/articles/${Buffer.from(params.articleUrl).toString(
        "base64"
      )}/generate-comment`,
      "POST",
      parseSuggestedComment,
      this.apiKey,
      {
        clientDescription: params.clientDescription,
      }
    );
  }

  /**
   * Gets all clients, regardless of who they belong to
   * @returns All clients
   */
  public async getAllClients(): Promise<Client[]> {
    return await fetcher("/client", "GET", parseClients, this.apiKey);
  }

  /**
   * Gets all clients that are clients of the user
   * @returns The user's own clients
   */
  public async getOwnClients(): Promise<Client[]> {
    return await fetcher("/client/own", "GET", parseClients, this.apiKey);
  }

  /**
   * Checks to see if a client's name is unique. If a name is
   * not unique the client should have a description added when
   * it is created so that the app can differentiate between
   * companies of the same name when loading coverage.
   * @returns The name and a boolean of whether it's unique
   */
  public async isClientNameUnique(name: string): Promise<IsNameUniqueOutput> {
    return await fetcher(
      "/client/is-name-unique",
      "POST",
      parseIsNameUnique,
      this.apiKey,
      {
        name,
      }
    );
  }

  /**
   * Creates a new client and adds it to the user's list of
   * clients. Attach a list of competitors, which can either
   * be a string or the ID of a client.
   * You should search clients before creating new competitors,
   * so that there aren't any duplicates.
   * @param client The data of the client to add
   * @returns A client and its competitors
   */
  public async createClient(
    client: CreateClientParams & {
      competitors: (CreateClientParams | string)[];
    }
  ): Promise<Client> {
    const resultClient = await fetcher(
      "/client/create",
      "POST",
      parseClient,
      this.apiKey,
      client
    );

    const competitorResults = await Promise.all(
      client.competitors
        .filter((competitor) => typeof competitor !== "string")
        .map((competitor) =>
          fetcher("/competitor/create", "POST", parseClient, this.apiKey, {
            body: JSON.stringify(competitor),
          })
        )
    );

    return await this.updateClient(resultClient.id, {
      competitors: competitorResults
        .map((c) => c.id)
        .concat(
          client.competitors.filter(
            (competitor) => typeof competitor === "string"
          ) as string[]
        ),
    });
  }

  /**
   * Updates a client based on its ID.
   * @param id The ID of the client to update
   * @param data The data of the client to update
   * @returns The client with its competitors
   */
  public async updateClient(
    id: string,
    data: Partial<CreateClientParams & { competitors: string[] }>
  ): Promise<Client> {
    return await fetcher(
      `/client/update/${id}`,
      "PATCH",
      parseClient,
      this.apiKey,
      data
    );
  }

  /**
   * Gets every publication in the system.
   * @returns A list of all publications
   */
  public async getPublications(): Promise<Publication[]> {
    return await fetcher("/publication", "GET", parsePublications, this.apiKey);
  }

  /**
   * Gets all coverage, separated by the client that it belongs to.
   * @returns All coverage in the system
   */
  public async getAllCoverage(): Promise<Coverage[]> {
    return await fetcher("/coverage", "GET", parseCoverage, this.apiKey);
  }

  /**
   * Gets coverage specifically for one client, along with the coverage for all its competitors.
   * @param clientId The ID of the client to get
   * @returns An object with the client's information and coverage for it and its competitors
   */
  public async getCoverageForClient(clientId: string): Promise<ClientCoverage> {
    return await fetcher(
      `/coverage/client/${clientId}`,
      "GET",
      parseClientCoverage,
      this.apiKey
    );
  }

  /**
   * Creates a new publication. All feeds that it is passed should be valid and parseable.
   * @param data The name, domain and feeds of the publication
   * @returns A publication if successful or an error if not
   */
  public async createPublication(
    data: CreatePublicationParams
  ): Promise<PublicationCreate | PublicationCreateError> {
    return await fetcher(
      "/publication/create",
      "POST",
      parseCreatePublication,
      this.apiKey,
      data
    );
  }

  /**
   * Updates a publication by its domain.
   * @param domain The domain of the publication to update
   * @param data A list of data to set on the publication
   * @returns The updated publication
   */
  public async updatePublication(
    domain: string,
    data: Partial<CreatePublicationParams>
  ): Promise<PublicationCreate | PublicationCreateError> {
    return await fetcher(
      `/publication/update/${domain}`,
      "PATCH",
      parseUpdatePublication,
      this.apiKey,
      data
    );
  }
}
