import type { Federation as FederationPreview } from "@/data/types";
import React from "react";
import StringifyJSON from "./StringifyJSON";

const FederationPreview = async ({
  federation,
}: {
  federation: FederationPreview;
}) => {
  return <StringifyJSON data={federation} />;
};

export default FederationPreview;
