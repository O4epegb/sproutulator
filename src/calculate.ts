import { Rule, NumberInputs, BooleanInputs } from './models';

export function calculate(
  rules: Array<Rule>,
  booleanInputs: BooleanInputs,
  numberInputs: NumberInputs
) {
  const reversedRules = rules.slice().reverse();
  const hExpressions = reversedRules.map((set) => set.hExpressions).flat();
  const kExpressions = reversedRules.map((set) => set.kExpressions).flat();

  const activeHExpression = hExpressions.find((exp) =>
    exp.condition(booleanInputs)
  );
  const H = activeHExpression?.result;

  const activeKExpression = kExpressions.find((exp) => exp.condition === H);

  const K = activeKExpression ? activeKExpression.result(numberInputs) : NaN;

  return {
    H,
    K,
    activeHExpression,
    activeKExpression,
  };
}
