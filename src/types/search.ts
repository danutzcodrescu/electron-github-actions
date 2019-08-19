export interface SearchRoot {
  total: number;
  results: Result[];
}

export interface Selected {
  id: string;
  url: string;
}

export interface Result {
  signifier?: string;
  name: Name;
  comments: any[];
  attributes: Attribute[];
  type: Type;
  context: Context;
  status: string;
  score: number;
  modified: number;
  parents: any[];
  tags: Tag[];
}

export interface Name {
  val: string;
  id: string;
  type: string;
  pageUrl: string;
  restUrl: string;
}

export interface Attribute {
  typeId: string;
  val: string;
  id: string;
  type: string;
  kind: string;
  pageUrl: string;
  restUrl: string;
}

export interface Type {
  val: string;
  id: string;
  type: string;
  pageUrl: string;
  restUrl: string;
}

export interface Context {
  val: string;
  id: string;
  type: string;
  kind: string;
  typeId: string;
  pageUrl: string;
  restUrl: string;
}

export interface Tag {
  val: string;
  id: string;
  type: string;
  pageUrl: string;
  restUrl: string;
}

export interface ResultWithDetails extends Result {
  attributes: Attribute[];
  assetType?: any;
  community?: string;
}

export interface SearchWithDetails extends SearchRoot {
  results: ResultWithDetails[];
}
