import fetch, { Headers, RequestInit } from "node-fetch";

const BASE_ROUTE = "https://seal-app-s8spb.ondigitalocean.app";

export type JSONValue = string | number | boolean | JSONObject | JSONArray;

export interface JSONObject {
  [x: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> {}

export const fetcher = async <T>(
  route: string,
  method: string,
  parseResult: (data: JSONValue) => T,
  apiKey: string,
  options: RequestInit = {}
): Promise<T> => {
  const headers = new Headers();
  headers.append("Authorization", apiKey);

  const res = await fetch(BASE_ROUTE + route, {
    method,
    headers,
    ...options,
  });

  const json: JSONValue = await res.json();

  return parseResult(json);
};
