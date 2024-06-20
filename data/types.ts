export type Federation = {
  api_endpoints: Record<string, Guardian>;
  consensus_version: FedimintVersion;
  meta: any; // Replace 'any' with the appropriate type when it's known
  modules: Record<string, FedimintModule>;
};

export type Guardian = {
  name: string;
  url: string;
};

export type FedimintModule = {
  kind: string;
  version: FedimintVersion;
  config: any; // Replace 'any' with the appropriate type when it's known
};

export type FedimintVersion = {
  major: number;
  minor: number;
};
