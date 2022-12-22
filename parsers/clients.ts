import { JSONValue } from "../services/fetcher";

export enum NameUniqueness {
  UNIQUE_WORD = "UNIQUE_WORD",
  ENGLISH_WORD = "ENGLISH_WORD",
}

export interface CreateClientParams {
  name: string;
  tags: string[];
}

interface Client {
  id: string;
  name: string;
  nameUniqueness: NameUniqueness;
  tags: string;
}

export const parseClients = (data: any): Client[] => {
  return data;
};

export const parseClient = (data: any): Client => {
  return data;
};
