// queries.ts
import { T } from "@/utils/functions";
import fetcher from "./fetcher";
import { Federation } from "./types";

export const federationIdsTask: T.Task<Array<string>> = () =>
  fetcher("/federations") as any;

export const getFederationConfigTask =
  (id: string): T.Task<Federation> =>
  () =>
    fetcher(`/federations/${id}/config`);

export const getFederationMetaTask =
  (id: string): T.Task<Federation> =>
  () =>
    fetcher(`/federations/${id}/meta`);
