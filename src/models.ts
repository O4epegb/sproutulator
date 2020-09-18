export type H = 'T' | 'M' | 'P';

export type BooleanInputs = Array<boolean>;
export type NumberInputs = Array<number>;

export interface HExp {
  description: string;
  condition: (variables: BooleanInputs) => boolean;
  result: H;
}

export interface KExp {
  description: string;
  result: (variables: NumberInputs) => number;
  condition: H;
}

export interface Rule {
  name: string;
  hExpressions: Array<HExp>;
  kExpressions: Array<KExp>;
}
