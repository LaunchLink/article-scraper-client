import { RequestInit } from "node-fetch";
export type JSONValue = string | number | boolean | JSONObject | JSONArray;
export interface JSONObject {
    [x: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {
}
export declare const fetcher: <T>(route: string, method: string, parseResult: (data: JSONValue) => T, apiKey: string, options?: RequestInit) => Promise<T>;
