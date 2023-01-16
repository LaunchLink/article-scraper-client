import { Article, SuggestedCommentOutput } from "./parsers/articles";
import { Client, CreateClientParams, IsNameUniqueOutput } from "./parsers/clients";
import { ClientCoverage, Coverage } from "./parsers/coverage";
import { CreatePublicationParams, Publication, PublicationCreate, PublicationCreateError } from "./parsers/publications";
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
    private apiKey;
    /**
     * Creates a new Panopticon Client. Pass the API key here, or set it as PANOPTICON_API_KEY in your environment variables.
     * @param options
     */
    constructor(options?: Partial<PanopticonClientOptions>);
    /**
     * Gets all articles sorted by date (newest first)
     * @param options
     * @returns A list of all articles in the system
     */
    getArticles(options: GetArticlesOptions): Promise<Article[]>;
    /**
     * Generates a suggested comment for a client to the article.
     * @param params
     * @returns An object with the key `text` as the result
     */
    suggestArticleComment(params: SuggestCommentParams): Promise<SuggestedCommentOutput>;
    /**
     * Gets all clients, regardless of who they belong to
     * @returns All clients
     */
    getAllClients(): Promise<Client[]>;
    /**
     * Gets all clients that are clients of the user
     * @returns The user's own clients
     */
    getOwnClients(): Promise<Client[]>;
    /**
     * Checks to see if a client's name is unique. If a name is
     * not unique the client should have a description added when
     * it is created so that the app can differentiate between
     * companies of the same name when loading coverage.
     * @returns The name and a boolean of whether it's unique
     */
    isClientNameUnique(name: string): Promise<IsNameUniqueOutput>;
    /**
     * Creates a new client and adds it to the user's list of
     * clients. Attach a list of competitors, which can either
     * be a string or the ID of a client.
     * You should search clients before creating new competitors,
     * so that there aren't any duplicates.
     * @param client The data of the client to add
     * @returns A client and its competitors
     */
    createClient(client: CreateClientParams & {
        competitors: (CreateClientParams | string)[];
    }): Promise<Client>;
    /**
     * Updates a client based on its ID.
     * @param id The ID of the client to update
     * @param data The data of the client to update
     * @returns The client with its competitors
     */
    updateClient(id: string, data: Partial<CreateClientParams & {
        competitors: string[];
    }>): Promise<Client>;
    /**
     * Gets every publication in the system.
     * @returns A list of all publications
     */
    getPublications(): Promise<Publication[]>;
    /**
     * Gets all coverage, separated by the client that it belongs to.
     * @returns All coverage in the system
     */
    getAllCoverage(): Promise<Coverage[]>;
    /**
     * Gets coverage specifically for one client, along with the coverage for all its competitors.
     * @param clientId The ID of the client to get
     * @returns An object with the client's information and coverage for it and its competitors
     */
    getCoverageForClient(clientId: string): Promise<ClientCoverage>;
    /**
     * Creates a new publication. All feeds that it is passed should be valid and parseable.
     * @param data The name, domain and feeds of the publication
     * @returns A publication if successful or an error if not
     */
    createPublication(data: CreatePublicationParams): Promise<PublicationCreate | PublicationCreateError>;
    /**
     * Updates a publication by its domain.
     * @param domain The domain of the publication to update
     * @param data A list of data to set on the publication
     * @returns The updated publication
     */
    updatePublication(domain: string, data: Partial<CreatePublicationParams>): Promise<PublicationCreate | PublicationCreateError>;
}
export {};
