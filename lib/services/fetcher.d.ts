import { RequestInit } from "node-fetch";
export type JSONValue = string | number | boolean | JSONObject | JSONArray;
export interface JSONObject {
    [x: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {
}
type HttpMethod = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
export declare const fetcher: <T>(route: string, method: HttpMethod, parseResult: (data: JSONValue) => T, apiKey: string, options?: RequestInit) => Promise<T>;
export {};
