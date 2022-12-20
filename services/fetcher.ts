import fetch, { Headers } from "node-fetch";

const BASE_ROUTE = "localhost:3000";

export const fetcher = async <T>(
  route: string,
  method: string,
  parseResult: (data: any) => T,
  apiKey: string
): Promise<T> => {
  const headers = new Headers();
  headers.append("Authorization", apiKey);

  const res = await fetch(BASE_ROUTE + route, {
    method,
    headers,
  });

  const json = await res.json();

  return parseResult(json);
};
