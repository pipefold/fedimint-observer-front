import FederationPreview from "@/components/FederationPreview";
import {
  federationIdsTask,
  getFederationConfigTask,
  getFederationMetaTask,
} from "@/data/queries";
import { A, T } from "@/utils/functions";
import { sequenceT } from "fp-ts/lib/Apply";
import { pipe } from "fp-ts/lib/function";

export default async function Home() {
  const allFedsTask = pipe(
    federationIdsTask,
    T.chain(
      A.traverse(T.ApplicativePar)((id) =>
        pipe(
          sequenceT(T.ApplicativePar)(
            getFederationConfigTask(id),
            getFederationMetaTask(id)
          ),
          T.map(([config, meta]) => ({ ...config, id, meta }))
        )
      )
    )
  );

  const federations = await allFedsTask();

  return (
    <main className="max-w-6xl mx-auto font-mono text-xl">
      {federations.map((federation) => (
        <FederationPreview key={federation.id} federation={federation} />
      ))}
    </main>
  );
}
