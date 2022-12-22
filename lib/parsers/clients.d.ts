export declare enum NameUniqueness {
    UNIQUE_WORD = "UNIQUE_WORD",
    ENGLISH_WORD = "ENGLISH_WORD"
}
export interface CreateClientParams {
    name: string;
    tags: string[];
}
export interface Client {
    id: string;
    name: string;
    nameUniqueness: NameUniqueness;
    tags: string;
}
export declare const parseClients: (data: any) => Client[];
export declare const parseClient: (data: any) => Client;
