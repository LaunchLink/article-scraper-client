export declare enum NameUniqueness {
    UNIQUE_WORD = "UNIQUE_WORD",
    ENGLISH_WORD = "ENGLISH_WORD"
}
export interface CreateClientParams {
    name: string;
    tags: string[];
    description: string | null;
}
export interface Client {
    id: string;
    name: string;
    description: string | null;
    nameUniqueness: NameUniqueness;
    tags: string;
    createdAt: Date;
    competitors: Omit<Client, "competitors">[];
}
export interface IsNameUniqueOutput {
    name: string;
    isUnique: boolean;
}
export declare const parseClients: (data: any) => Client[];
export declare const parseClient: (data: any) => Client;
export declare const parseIsNameUnique: (data: any) => IsNameUniqueOutput;
