import { Rule } from './models';

export const baseRule: Rule = {
  name: 'Base',
  hExpressions: [
    {
      description: 'A && B && C => P',
      condition: ([A, B, C]) => A && B && C,
      result: 'P',
    },
    {
      description: 'A && B && !C => M',
      condition: ([A, B, C]) => A && B && !C,
      result: 'M',
    },
    {
      description: '!A && B && C => T',
      condition: ([A, B, C]) => !A && B && C,
      result: 'T',
    },
  ],
  kExpressions: [
    {
      description: 'H = P => K = D + (D * (E - F) / 25.5)',
      result: ([D, E, F]) => D + (D * (E - F)) / 25.5,
      condition: 'P',
    },
    {
      description: 'H = M => K = D + (D * E / 10)',
      result: ([D, E, F]) => D + (D * E) / 10,
      condition: 'M',
    },
    {
      description: 'H = T => K = D - (D * F / 30)',
      result: ([D, E, F]) => D - (D * F) / 30,
      condition: 'T',
    },
  ],
};

export const custom1Rule: Rule = {
  name: 'Custom 1',
  hExpressions: [],
  kExpressions: [
    {
      description: 'H = P => K = 2 * D + (D * E / 100)',
      result: ([D, E, F]) => 2 * D + (D * E) / 100,
      condition: 'P',
    },
  ],
};

export const custom2Rule: Rule = {
  name: 'Custom 2',
  hExpressions: [
    {
      description: 'A && B && !C => T',
      condition: ([A, B, C]) => A && B && !C,
      result: 'T',
    },
    {
      description: 'A && !B && C => M',
      condition: ([A, B, C]) => A && !B && C,
      result: 'M',
    },
  ],
  kExpressions: [
    {
      description: 'H = M => K = F + D + (D * E / 100)',
      result: ([D, E, F]) => F + D + (D * E) / 100,
      condition: 'M',
    },
  ],
};

export const ruleSets: Array<Rule> = [baseRule, custom1Rule, custom2Rule];
