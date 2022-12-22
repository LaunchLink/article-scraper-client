export interface Feed {
    url: string;
    publicationId: string;
}
export interface Publication {
    domain: string;
    name: string;
    feeds: Feed[];
}
export interface ValidatedFeed {
    message?: string;
    error?: string;
    url: string;
}
export type PublicationCreate = Publication & {
    validatedFeeds: ValidatedFeed[];
};
export interface PublicationCreateError {
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
export declare function isCreatePublicationError(publication: PublicationCreate | PublicationCreateError): publication is PublicationCreateError;
export declare const parsePublications: (data: any) => Publication[];
export declare const parseCreatePublication: (data: any) => PublicationCreate | PublicationCreateError;
export declare const parseUpdatePublication: (data: any) => PublicationCreate | PublicationCreateError;
