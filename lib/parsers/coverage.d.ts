export interface Coverage {
    name: string;
    id: string;
    coverage: {
        url: string;
        createdAt: Date;
        sentence: string;
    }[];
}
export interface ClientCoverage {
    name: string;
    id: string;
    coverage: {
        url: string;
        sentence: string;
        createdAt: Date;
    }[];
    competitorCoverage: {
        name: string;
        id: string;
        coverage: {
            url: string;
            createdAt: Date;
            sentence: string;
        }[];
    }[];
}
export declare const parseCoverage: (data: any) => Coverage[];
export declare const parseClientCoverage: (data: any) => ClientCoverage;
