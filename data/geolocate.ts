import { T, TE } from "@/utils/functions";
import IPinfoWrapper, { IPinfo, AsnResponse, Domains } from "node-ipinfo";
import { Resolver } from "node:dns/promises";

const ipinfoWrapper = new IPinfoWrapper(process.env.IPINFO_TOKEN as string);

// ipinfoWrapper.lookupIp("1.1.1.1").then((response: IPinfo) => {
//   console.log(response);
// });

// ipinfoWrapper.lookupASN("AS7922").then((response: AsnResponse) => {
//   console.log(response);
// });

const resolver = new Resolver();

export const resolveUrl = (url: string): TE.TaskEither<Error, string[]> =>
  TE.fromTask(() => {
    const foo = resolver.resolve4(new URL(url).hostname);
    return foo
      .then((x) => {
        console.log(`I did get called`);
        return x;
      })
      .catch((err) => {
        console.error(`Error resolving URL: ${err.message}`);
        throw err;
      });
  });

export const testResolveUrl = (url: string) => {
  const { hostname } = new URL(url);
  resolver
    .resolve4(hostname)
    .then((x) => {
      console.log(x);
    })
    .catch((e) => {
      console.log(e);
    });
};
