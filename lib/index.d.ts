import { Article } from "./parsers/articles";
import { Client, CreateClientParams } from "./parsers/clients";
import { CreatePublicationParams, Publication, PublicationCreate, PublicationCreateError } from "./parsers/publications";
interface PanopticonClientOptions {
    panopticonApiKey: string;
}
export declare class PanopticonClient {
    private apiKey;
    constructor(options?: Partial<PanopticonClientOptions>);
    getArticles(): Promise<Article[]>;
    getClients(): Promise<Client[]>;
    createClient(data: CreateClientParams): Promise<Client>;
    updateClient(id: string, data: Partial<CreateClientParams>): Promise<Client>;
    getPublications(): Promise<Publication[]>;
    createPublication(data: CreatePublicationParams): Promise<PublicationCreate | PublicationCreateError>;
    updatePublication(domain: string, data: Partial<CreatePublicationParams>): Promise<PublicationCreate | PublicationCreateError>;
}
export {};
