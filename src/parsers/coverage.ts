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

export const parseCoverage = (data: any): Coverage[] => {
  return data.map((d: any) => ({
    name: d.name,
    id: d.id,
    coverage: d.coverage.map((c: any) => ({
      url: c.url,
      sentence: c.sentence,
      createdAt: new Date(c.createdAt),
    })),
  }));
};

export const parseClientCoverage = (data: any): ClientCoverage => {
  return {
    id: data.id,
    name: data.name,
    coverage: data.coverage.map((c: any) => ({
      url: c.url,
      sentence: c.sentence,
      createdAt: new Date(c.createdAt),
    })),
    competitorCoverage: data.competitorCoverage.map((d: any) => ({
      name: d.name,
      id: d.id,
      coverage: d.coverage.map((c: any) => ({
        url: c.url,
        sentence: c.sentence,
        createdAt: new Date(c.createdAt),
      })),
    })),
  };
};
