import StringifyJSON from "@/components/StringifyJSON";
import {
  federationIdsTask,
  getFederationConfigTask,
  getFederationMetaTask,
} from "@/data/queries";
import { A, R, T, TE, pipeLog } from "@/utils/functions";
import { sequenceT } from "fp-ts/lib/Apply";
import { pipe } from "fp-ts/lib/function";
import "../data/geolocate";
import { resolveUrl, testResolveUrl } from "../data/geolocate";

export default async function Home() {
  const data = await pipe(
    federationIdsTask,
    T.chain(
      A.traverse(T.ApplicativePar)((id) =>
        pipe(
          sequenceT(T.ApplicativePar)(
            getFederationConfigTask(id),
            getFederationMetaTask(id)
          ),
          TE.fromTask,
          TE.map(
            ([
              {
                global: { api_endpoints },
              },
              meta,
            ]) =>
              pipe(
                api_endpoints,
                R.toArray,
                A.map(([, { url }]) => {
                  testResolveUrl(url);
                  return url;
                })
                // A.traverse(TE.ApplicativePar)(([, { url }]) => {
                //   return () => resolveUrl(url)();
                // })
                // TE.fold(
                //   (err) => {
                //     return T.of(JSON.stringify(err));
                //   },
                //   (r) => {
                //     return T.of(JSON.stringify(r));
                //   }
                // )
              )
          )
        )
      )
    )
    // T.map(flow(A.dropLeft(1), A.takeLeft(1)))
  )();

  return (
    <main className="max-w-6xl mx-auto font-mono text-xl">
      <StringifyJSON data={data} />
    </main>
  );
}
