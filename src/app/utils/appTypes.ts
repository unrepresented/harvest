export interface Profile {
  public_key: string;
  mini_bio: string;
  short_handle: string;
  ranking: number;
  imbalance: number;
  plot_id?: string;
  height?: number;
  error?: string;
}

export interface GraphNode {
  id: number;
  group?: number;
  neighbors?: GraphNode[];
  links?: GraphLink[];
  pubkey: string;
  label: string;
  ranking: number;
}

export interface GraphLink {
  source: number;
  target: number;
  value: number;
}

export interface Graph {
  public_key: string;
  graph?: string;
  nodes?: GraphNode[];
  links?: GraphLink[];
  plot_id?: string;
  height?: number;
}

export interface PlotHeader {
  previous: string;
  hash_list_root: string;
  time: number;
  target: string;
  thread_work: string;
  nonce: number;
  height: number;
  representation_count: number;
}

export interface PlotIdHeaderPair {
  plot_id: string;
  header: PlotHeader;
}

export interface Plot {
  header: PlotHeader;
  representations: Representation[];
}

export interface Representation {
  from: string;
  to: string;
  memo: string;
  time: number;
  nonce?: number;
  series?: number;
  signature?: string;
}
