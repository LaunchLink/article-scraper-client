export enum NameUniqueness {
  UNIQUE_WORD = "UNIQUE_WORD",
  ENGLISH_WORD = "ENGLISH_WORD",
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

export const parseClients = (data: any): Client[] => {
  return data.map((d: any) => parseClient(d));
};

export const parseClient = (data: any): Client => {
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    competitors: data.competitors.map((competitor: any) => ({
      ...competitor,
      createdAt: new Date(competitor.createdAt),
    })),
  };
};

export const parseIsNameUnique = (data: any): IsNameUniqueOutput => {
  return {
    name: data.name,
    isUnique: Boolean(data.isUnique),
  };
};
