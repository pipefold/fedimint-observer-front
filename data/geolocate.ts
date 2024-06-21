import { E, TE } from "@/utils/functions";
import { flow, pipe } from "fp-ts/lib/function";
import IPinfoWrapper, { IPinfo } from "node-ipinfo";
import { Resolver } from "node:dns/promises";

const resolver = new Resolver();

const ipinfoWrapper = new IPinfoWrapper(process.env.IPINFO_TOKEN as string);

// lefts the hostname back on failure
export const resolveHostnameTE = (
  hostname: string
): TE.TaskEither<string, string[]> =>
  pipe(() =>
    resolver
      .resolve4(hostname)
      .then(E.right)
      .catch(() => E.left(hostname))
  );

export const locateAddressTE =
  (address: string): TE.TaskEither<string, IPinfo> =>
  () =>
    ipinfoWrapper
      .lookupIp(address)
      .then(E.right)
      .catch(() => E.left(address));

export const hostnameToLocationTE = flow(
  resolveHostnameTE,
  TE.chain((addresses) => locateAddressTE(addresses[0]))
);
