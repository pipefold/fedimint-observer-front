import { hostnameToLocationTE } from "@/data/geolocate";
import type { Federation as FederationPreview } from "@/data/types";
import { A, R, T, TE } from "@/utils/functions";
import { pipe } from "fp-ts/lib/function";
import StringifyJSON from "./StringifyJSON";

const FederationPreview = async ({
  federation,
}: {
  federation: FederationPreview;
}) => {
  const children = await pipe(
    federation.global.api_endpoints,
    R.toArray,
    A.map(([, { url, name }]) =>
      pipe(
        hostnameToLocationTE(new URL(url).hostname),
        TE.match(
          (hostname) => <StringifyJSON key={name} data={{ hostname }} />,
          (addresses) => <StringifyJSON key={name} data={{ addresses }} />
        )
      )
    ),
    T.sequenceArray
  )();

  return <div>{children}</div>;
};

export default FederationPreview;
